import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  FileText,
  Eye,
  Clock,
  Loader2,
  BarChart3,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchBlogs();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, slug, status, publish_date, scheduled_date, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBlogs(data as Blog[]);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Blog post has been deleted.",
      });
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

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | TechPivot CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/">
              <img src={logoDark} alt="TechPivot" className="h-10" />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin CMS</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Blog Posts</h1>
              <p className="text-muted-foreground mt-1">
                Manage your blog content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/admin/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Link>
              </Button>
              <Button asChild>
                <Link to="/admin/blog/new">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                  <p className="text-2xl font-bold">
                    {blogs.filter((b) => b.status === "published").length}
                  </p>
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
                  <p className="text-2xl font-bold">
                    {blogs.filter((b) => b.status === "scheduled").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blog List */}
          <div className="bg-background rounded-xl border border-border overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No blog posts yet</p>
                <p className="text-muted-foreground mb-4">
                  Create your first blog post to get started.
                </p>
                <Button asChild>
                  <Link to="/admin/blog/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold truncate">{blog.title}</h3>
                        {getStatusBadge(blog.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {blog.status === "scheduled" && blog.scheduled_date
                          ? `Scheduled for ${format(new Date(blog.scheduled_date), "MMM dd, yyyy 'at' h:mm a")}`
                          : blog.status === "published" && blog.publish_date
                          ? `Published ${format(new Date(blog.publish_date), "MMM dd, yyyy")}`
                          : `Created ${format(new Date(blog.created_at), "MMM dd, yyyy")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {blog.status === "published" && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blogs/${blog.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/blog/${blog.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
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
                              {deleting === blog.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
