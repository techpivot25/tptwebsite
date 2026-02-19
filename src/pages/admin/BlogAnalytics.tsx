import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Eye,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  Download,
  BarChart3,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, subDays, startOfDay, eachDayOfInterval, eachHourOfInterval, startOfHour } from "date-fns";
import logoDark from "@/assets/logo-dark.png";

interface AnalyticsRow {
  id: string;
  blog_id: string;
  country_code: string | null;
  country_name: string | null;
  state_code: string | null;
  city: string | null;
  device_type: string | null;
  referrer: string | null;
  viewed_at: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  status: string;
  publish_date: string | null;
  created_at: string;
}

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(210, 70%, 50%)",
  "hsl(150, 60%, 45%)",
  "hsl(45, 80%, 50%)",
  "hsl(0, 70%, 55%)",
  "hsl(280, 60%, 55%)",
  "hsl(180, 50%, 45%)",
  "hsl(30, 70%, 50%)",
];

const BlogAnalytics = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30d");
  const [selectedBlog, setSelectedBlog] = useState(searchParams.get("blog") || "all");

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [dateRange]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: roleData } = await supabase
      .from("user_roles").select("role")
      .eq("user_id", session.user.id).eq("role", "admin").single();
    if (!roleData) { await supabase.auth.signOut(); navigate("/admin/login"); }
  };

  const fetchData = async () => {
    setLoading(true);
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    const since = subDays(new Date(), days).toISOString();

    const [analyticsRes, blogsRes] = await Promise.all([
      supabase.from("blog_analytics").select("*").gte("viewed_at", since).order("viewed_at", { ascending: false }),
      supabase.from("blogs").select("id, title, slug, status, publish_date, created_at").order("created_at", { ascending: false }),
    ]);

    if (analyticsRes.data) setAnalytics(analyticsRes.data as AnalyticsRow[]);
    if (blogsRes.data) setBlogs(blogsRes.data as Blog[]);
    setLoading(false);
  };

  const filtered = useMemo(() => {
    if (selectedBlog === "all") return analytics;
    return analytics.filter((a) => a.blog_id === selectedBlog);
  }, [analytics, selectedBlog]);

  // KPIs
  const totalViews = filtered.length;
  const uniqueCountries = new Set(filtered.map((a) => a.country_code).filter(Boolean)).size;
  const topBlog = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((a) => { counts[a.blog_id] = (counts[a.blog_id] || 0) + 1; });
    const topId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (!topId) return null;
    const blog = blogs.find((b) => b.id === topId[0]);
    return blog ? { title: blog.title, views: topId[1] } : null;
  }, [filtered, blogs]);

  // Views over time (daily)
  const viewsOverTime = useMemo(() => {
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    const interval = eachDayOfInterval({ start: subDays(new Date(), days), end: new Date() });
    const counts: Record<string, number> = {};
    filtered.forEach((a) => {
      const day = format(new Date(a.viewed_at), "yyyy-MM-dd");
      counts[day] = (counts[day] || 0) + 1;
    });
    return interval.map((d) => ({
      date: format(d, "MMM dd"),
      views: counts[format(d, "yyyy-MM-dd")] || 0,
    }));
  }, [filtered, dateRange]);

  // Hourly heatmap data
  const hourlyData = useMemo(() => {
    const hours: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hours[i] = 0;
    filtered.forEach((a) => {
      const h = new Date(a.viewed_at).getHours();
      hours[h]++;
    });
    return Object.entries(hours).map(([h, count]) => ({
      hour: `${h.padStart(2, "0")}:00`,
      views: count,
    }));
  }, [filtered]);

  // Country breakdown
  const countryData = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((a) => {
      const c = a.country_code || "Unknown";
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, views]) => ({ country, views }));
  }, [filtered]);

  // State/region breakdown
  const stateData = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((a) => {
      const s = a.state_code || a.city || "Unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([state, views]) => ({ state, views }));
  }, [filtered]);

  // Device breakdown
  const deviceData = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((a) => {
      const d = a.device_type || "unknown";
      counts[d] = (counts[d] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  // Per-blog performance table
  const blogPerformance = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((a) => { counts[a.blog_id] = (counts[a.blog_id] || 0) + 1; });
    return blogs
      .map((b) => ({ ...b, views: counts[b.id] || 0 }))
      .sort((a, b) => b.views - a.views);
  }, [filtered, blogs]);

  // CSV export
  const exportCSV = () => {
    const headers = ["Blog Title", "Country", "State/City", "Device", "Referrer", "Viewed At"];
    const rows = filtered.map((a) => {
      const blog = blogs.find((b) => b.id === a.blog_id);
      return [
        blog?.title || a.blog_id,
        a.country_code || "",
        a.state_code || a.city || "",
        a.device_type || "",
        a.referrer || "",
        a.viewed_at,
      ].map((v) => `"${v}"`).join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-analytics-${dateRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const DeviceIcon = ({ type }: { type: string }) => {
    if (type === "mobile") return <Smartphone className="w-4 h-4" />;
    if (type === "tablet") return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <>
      <Helmet>
        <title>Blog Analytics | TechPivot CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <img src={logoDark} alt="TechPivot" className="h-8" />
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedBlog} onValueChange={setSelectedBlog}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Blogs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blogs</SelectItem>
                  {blogs.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Views</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{uniqueCountries}</p>
                        <p className="text-sm text-muted-foreground">Countries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{topBlog?.views || 0}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[140px]" title={topBlog?.title}>
                          {topBlog?.title || "No data"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{blogs.filter((b) => b.status === "published").length}</p>
                        <p className="text-sm text-muted-foreground">Published</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Views Over Time */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Views Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={viewsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Hourly Heatmap */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Peak Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="hour" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} interval={2} />
                          <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Device Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Devices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {deviceData.length > 0 ? (
                      <div className="h-[250px] flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={deviceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {deviceData.map((_, i) => (
                                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-10">No data yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Top Countries */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Countries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {countryData.length > 0 ? (
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={countryData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                            <YAxis type="category" dataKey="country" width={80} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Bar dataKey="views" fill="hsl(210, 70%, 50%)" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-10">No geo data yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Top States/Regions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Regions / Cities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stateData.length > 0 ? (
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stateData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                            <YAxis type="category" dataKey="state" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Bar dataKey="views" fill="hsl(150, 60%, 45%)" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-10">No region data yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Blog Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blog Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Title</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Views</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Published</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPerformance.map((blog) => (
                          <tr key={blog.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">
                              <Link to={`/admin/blog/${blog.id}`} className="font-medium hover:text-primary transition-colors">
                                {blog.title}
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                                {blog.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-medium">{blog.views.toLocaleString()}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {blog.publish_date ? format(new Date(blog.publish_date), "MMM dd, yyyy") : "—"}
                            </td>
                          </tr>
                        ))}
                        {blogPerformance.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center py-8 text-muted-foreground">No blogs found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default BlogAnalytics;
