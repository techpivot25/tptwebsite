import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";
import {
  Plus, Edit, Trash2, LogOut, FileText, Eye, Clock, Loader2,
  BarChart3, TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import BlogAnalyticsModal from "@/components/admin/BlogAnalyticsModal";
import logoDark from "@/assets/logo-dark.png";

interface Blog {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "scheduled";
  publish_date: string | null;
  scheduled_date: string | null;
  created_at: string;
}

interface BlogViewData {
  views7d: number;
  viewsPrev7d: number;
}

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [viewsMap, setViewsMap] = useState<Record<string, BlogViewData>>({});
  const [totalViews, setTotalViews] = useState(0);
  const [analyticsModal, setAnalyticsModal] = useState<{ open: boolean; blogId: string; title: string }>({
    open: false, blogId: "", title: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchBlogs();
    fetchViewCounts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: roleData } = await supabase
      .from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").single();
    if (!roleData) { await supabase.auth.signOut(); navigate("/admin/login"); }
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, slug, status, publish_date, scheduled_date, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setBlogs(data as Blog[]);
    setLoading(false);
  };

  const fetchViewCounts = async () => {
    const now = new Date();
    const sevenAgo = subDays(now, 7).toISOString();
    const fourteenAgo = subDays(now, 14).toISOString();

    const { data: recent } = await supabase
      .from("blog_analytics")
      .select("blog_id, viewed_at")
      .gte("viewed_at", fourteenAgo);

    if (!recent) return;

    const map: Record<string, BlogViewData> = {};
    let total = 0;
    recent.forEach((r) => {
      if (!map[r.blog_id]) map[r.blog_id] = { views7d: 0, viewsPrev7d: 0 };
      const viewDate = new Date(r.viewed_at);
      if (viewDate >= new Date(sevenAgo)) {
        map[r.blog_id].views7d++;
        total++;
      } else {
        map[r.blog_id].viewsPrev7d++;
      }
    });
    setViewsMap(map);
    setTotalViews(total);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete blog post.", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Blog post has been deleted." });
      fetchBlogs();
    }
    setDeleting(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Published</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  const getTrendInfo = (blogId: string) => {
    const data = viewsMap[blogId];
    if (!data) return { icon: <Minus className="w-3 h-3 text-muted-foreground" />, text: "0%", color: "text-muted-foreground" };
    const { views7d, viewsPrev7d } = data;
    if (viewsPrev7d === 0 && views7d === 0) return { icon: <Minus className="w-3 h-3 text-muted-foreground" />, text: "0%", color: "text-muted-foreground" };
    if (viewsPrev7d === 0) return { icon: <TrendingUp className="w-3 h-3 text-green-600" />, text: "+100%", color: "text-green-600" };
    const pct = Math.round(((views7d - viewsPrev7d) / viewsPrev7d) * 100);
    if (pct > 0) return { icon: <TrendingUp className="w-3 h-3 text-green-600" />, text: `+${pct}%`, color: "text-green-600" };
    if (pct < 0) return { icon: <TrendingDown className="w-3 h-3 text-destructive" />, text: `${pct}%`, color: "text-destructive" };
    return { icon: <Minus className="w-3 h-3 text-muted-foreground" />, text: "0%", color: "text-muted-foreground" };
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | TechPivot CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/"><img src={logoDark} alt="TechPivot" className="h-10" /></Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin CMS</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Page Header with Analytics button */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Blog Posts</h1>
              <p className="text-muted-foreground mt-1">Manage your blog content</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link to="/admin/blog/new"><Plus className="w-4 h-4 mr-2" />New Post</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/analytics"><BarChart3 className="w-4 h-4 mr-2" />Analytics</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-background rounded-xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogs.length}</p>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogs.filter(b => b.status === "published").length}</p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogs.filter(b => b.status === "scheduled").length}</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Views (7d)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blog List */}
          <div className="bg-background rounded-xl border border-border overflow-hidden">
            {loading ? (
              <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" /></div>
            ) : blogs.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No blog posts yet</p>
                <p className="text-muted-foreground mb-4">Create your first blog post to get started.</p>
                <Button asChild><Link to="/admin/blog/new"><Plus className="w-4 h-4 mr-2" />Create Post</Link></Button>
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-[1fr_100px_120px_140px_140px] gap-4 px-6 py-3 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span>Title</span>
                  <span>Status</span>
                  <span>Views 📊</span>
                  <span>Date</span>
                  <span className="text-right">Actions</span>
                </div>
                <div className="divide-y divide-border">
                  {blogs.map((blog) => {
                    const views = viewsMap[blog.id]?.views7d || 0;
                    const trend = getTrendInfo(blog.id);
                    return (
                      <div
                        key={blog.id}
                        className="px-6 py-4 flex flex-col md:grid md:grid-cols-[1fr_100px_120px_140px_140px] gap-2 md:gap-4 items-start md:items-center hover:bg-muted/50 transition-colors"
                      >
                        {/* Title */}
                        <h3 className="font-semibold truncate">{blog.title}</h3>

                        {/* Status */}
                        <div>{getStatusBadge(blog.status)}</div>

                        {/* Views */}
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="font-mono cursor-default">
                                {views.toLocaleString()}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{views} views in last 7 days</p>
                              <p className={trend.color}>WoW: {trend.text}</p>
                            </TooltipContent>
                          </Tooltip>
                          <span className={`flex items-center gap-0.5 text-xs ${trend.color}`}>
                            {trend.icon}
                            {trend.text}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setAnalyticsModal({ open: true, blogId: blog.id, title: blog.title })}
                          >
                            <BarChart3 className="w-3.5 h-3.5 text-primary" />
                          </Button>
                        </div>

                        {/* Date */}
                        <p className="text-sm text-muted-foreground">
                          {blog.status === "scheduled" && blog.scheduled_date
                            ? format(new Date(blog.scheduled_date), "MMM dd, yyyy")
                            : blog.status === "published" && blog.publish_date
                            ? format(new Date(blog.publish_date), "MMM dd, yyyy")
                            : format(new Date(blog.created_at), "MMM dd, yyyy")}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-1 md:justify-end">
                          {blog.status === "published" && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/blogs/${blog.slug}`} target="_blank"><Eye className="w-4 h-4" /></Link>
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/admin/blog/${blog.id}`}><Edit className="w-4 h-4" /></Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(blog.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  disabled={deleting === blog.id}
                                >
                                  {deleting === blog.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <BlogAnalyticsModal
        open={analyticsModal.open}
        onOpenChange={(open) => setAnalyticsModal((prev) => ({ ...prev, open }))}
        blogId={analyticsModal.blogId}
        blogTitle={analyticsModal.title}
      />
    </>
  );
};

export default AdminDashboard;
