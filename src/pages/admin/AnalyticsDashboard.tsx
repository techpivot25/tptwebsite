import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Download, Globe, Smartphone, Monitor, TrendingUp, FileText, Eye, Users } from "lucide-react";
import { format, subDays } from "date-fns";
import logoDark from "@/assets/logo-dark.png";

interface TopBlog {
  blog_id: string;
  title: string;
  views: number;
}

interface GeoEntry {
  location: string;
  count: number;
}

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(7);
  const [totalViews, setTotalViews] = useState(0);
  const [uniqueCountries, setUniqueCountries] = useState(0);
  const [topBlogs, setTopBlogs] = useState<TopBlog[]>([]);
  const [geoData, setGeoData] = useState<GeoEntry[]>([]);
  const [dailyViews, setDailyViews] = useState<{ date: string; count: number }[]>([]);
  const [deviceData, setDeviceData] = useState<{ type: string; count: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [range]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: roleData } = await supabase
      .from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").single();
    if (!roleData) { await supabase.auth.signOut(); navigate("/admin/login"); }
  };

  const fetchAll = async () => {
    setLoading(true);
    const since = subDays(new Date(), range).toISOString();

    // All analytics in range
    const { data: raw } = await supabase
      .from("blog_analytics")
      .select("blog_id, viewed_at, country_name, city, device_type")
      .gte("viewed_at", since)
      .order("viewed_at", { ascending: true });

    if (!raw) { setLoading(false); return; }

    setTotalViews(raw.length);

    // Unique countries
    const countries = new Set(raw.map(r => r.country_name).filter(Boolean));
    setUniqueCountries(countries.size);

    // Top blogs
    const blogCounts: Record<string, number> = {};
    raw.forEach(r => { blogCounts[r.blog_id] = (blogCounts[r.blog_id] || 0) + 1; });
    const topBlogIds = Object.entries(blogCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    if (topBlogIds.length > 0) {
      const { data: blogs } = await supabase
        .from("blogs")
        .select("id, title")
        .in("id", topBlogIds.map(t => t[0]));
      const titleMap: Record<string, string> = {};
      blogs?.forEach(b => { titleMap[b.id] = b.title; });
      setTopBlogs(topBlogIds.map(([blog_id, views]) => ({
        blog_id, views, title: titleMap[blog_id] || "Unknown"
      })));
    } else {
      setTopBlogs([]);
    }

    // Daily views
    const dailyMap: Record<string, number> = {};
    for (let i = range - 1; i >= 0; i--) {
      dailyMap[format(subDays(new Date(), i), "MMM dd")] = 0;
    }
    raw.forEach(r => {
      const key = format(new Date(r.viewed_at), "MMM dd");
      if (dailyMap[key] !== undefined) dailyMap[key]++;
    });
    setDailyViews(Object.entries(dailyMap).map(([date, count]) => ({ date, count })));

    // Geo
    const geoMap: Record<string, number> = {};
    raw.forEach(r => {
      const loc = `${r.city || "Unknown"}, ${r.country_name || "Unknown"}`;
      geoMap[loc] = (geoMap[loc] || 0) + 1;
    });
    setGeoData(Object.entries(geoMap).map(([location, count]) => ({ location, count })).sort((a, b) => b.count - a.count).slice(0, 10));

    // Devices
    const devMap: Record<string, number> = {};
    raw.forEach(r => {
      devMap[r.device_type || "Unknown"] = (devMap[r.device_type || "Unknown"] || 0) + 1;
    });
    setDeviceData(Object.entries(devMap).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count));

    setLoading(false);
  };

  const exportCSV = () => {
    const header = "Blog Title,Views\n";
    const rows = topBlogs.map(b => `"${b.title}",${b.views}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `analytics-${range}d.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const maxDaily = Math.max(...dailyViews.map(d => d.count), 1);

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | TechPivot CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/"><img src={logoDark} alt="TechPivot" className="h-10" /></Link>
            <span className="text-sm text-muted-foreground">Analytics Dashboard</span>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/dashboard"><ArrowLeft className="w-4 h-4 mr-1" />Back</Link>
              </Button>
              <h1 className="text-2xl font-bold">📊 Analytics Overview</h1>
            </div>
            <div className="flex items-center gap-2">
              {[7, 30, 90].map(d => (
                <Button key={d} variant={range === d ? "default" : "outline"} size="sm" onClick={() => setRange(d)}>
                  {d}d
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="w-4 h-4 mr-1" />CSV
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" /></div>
          ) : (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background rounded-xl border border-border p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Eye className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-2xl font-bold">{totalViews.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Views</p></div>
                </div>
                <div className="bg-background rounded-xl border border-border p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Globe className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-2xl font-bold">{uniqueCountries}</p><p className="text-sm text-muted-foreground">Countries</p></div>
                </div>
                <div className="bg-background rounded-xl border border-border p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-2xl font-bold">{topBlogs.length}</p><p className="text-sm text-muted-foreground">Active Posts</p></div>
                </div>
              </div>

              {/* Daily Chart */}
              <div className="bg-background rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Views Over Time</h3>
                <div className="flex items-end gap-1 h-40">
                  {dailyViews.map(d => (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{d.count > 0 ? d.count : ""}</span>
                      <div className="w-full bg-primary/80 rounded-t transition-all" style={{ height: `${(d.count / maxDaily) * 100}%`, minHeight: d.count > 0 ? "4px" : "1px" }} />
                      <span className="text-[10px] text-muted-foreground truncate">{d.date.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Blogs */}
                <div className="bg-background rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-4">Top Performing Posts</h3>
                  <div className="space-y-3">
                    {topBlogs.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No views recorded yet.</p>
                    ) : topBlogs.map((b, i) => (
                      <div key={b.blog_id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-muted-foreground w-5">{i + 1}.</span>
                          <span className="truncate">{b.title}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2 shrink-0">{b.views.toLocaleString()}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geo + Devices */}
                <div className="space-y-6">
                  <div className="bg-background rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-3">Top Locations</h3>
                    <div className="space-y-2">
                      {geoData.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No geo data.</p>
                      ) : geoData.slice(0, 5).map((g, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">🌍 {g.location}</span>
                          <Badge variant="secondary">{g.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-3">Devices</h3>
                    <div className="flex gap-3 flex-wrap">
                      {deviceData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
                          {d.type.toLowerCase().includes("mobile") ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                          <span className="capitalize">{d.type}</span>
                          <Badge variant="secondary">{d.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
