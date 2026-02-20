import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Globe, Smartphone, Monitor, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { format, subDays } from "date-fns";

interface BlogAnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: string;
  blogTitle: string;
}

interface DailyView {
  date: string;
  count: number;
}

interface GeoData {
  country_name: string;
  city: string;
  count: number;
}

interface DeviceData {
  device_type: string;
  count: number;
}

const BlogAnalyticsModal = ({ open, onOpenChange, blogId, blogTitle }: BlogAnalyticsModalProps) => {
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [views7d, setViews7d] = useState(0);
  const [dailyViews, setDailyViews] = useState<DailyView[]>([]);
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);

  useEffect(() => {
    if (open && blogId) fetchAnalytics();
  }, [open, blogId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7).toISOString();

    // Total views
    const { count: total } = await supabase
      .from("blog_analytics")
      .select("*", { count: "exact", head: true })
      .eq("blog_id", blogId);

    // 7d views
    const { count: recent } = await supabase
      .from("blog_analytics")
      .select("*", { count: "exact", head: true })
      .eq("blog_id", blogId)
      .gte("viewed_at", sevenDaysAgo);

    // Daily breakdown (last 7 days)
    const { data: rawDaily } = await supabase
      .from("blog_analytics")
      .select("viewed_at")
      .eq("blog_id", blogId)
      .gte("viewed_at", sevenDaysAgo)
      .order("viewed_at", { ascending: true });

    const dailyMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      dailyMap[format(subDays(now, i), "MMM dd")] = 0;
    }
    rawDaily?.forEach((r) => {
      const key = format(new Date(r.viewed_at), "MMM dd");
      if (dailyMap[key] !== undefined) dailyMap[key]++;
    });
    setDailyViews(Object.entries(dailyMap).map(([date, count]) => ({ date, count })));

    // Geo breakdown
    const { data: rawGeo } = await supabase
      .from("blog_analytics")
      .select("country_name, city")
      .eq("blog_id", blogId)
      .gte("viewed_at", sevenDaysAgo);

    const geoMap: Record<string, number> = {};
    rawGeo?.forEach((r) => {
      const key = `${r.city || "Unknown"}, ${r.country_name || "Unknown"}`;
      geoMap[key] = (geoMap[key] || 0) + 1;
    });
    setGeoData(
      Object.entries(geoMap)
        .map(([loc, count]) => {
          const [city, country_name] = loc.split(", ");
          return { country_name, city, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    );

    // Device breakdown
    const { data: rawDevice } = await supabase
      .from("blog_analytics")
      .select("device_type")
      .eq("blog_id", blogId)
      .gte("viewed_at", sevenDaysAgo);

    const devMap: Record<string, number> = {};
    rawDevice?.forEach((r) => {
      const key = r.device_type || "Unknown";
      devMap[key] = (devMap[key] || 0) + 1;
    });
    setDeviceData(
      Object.entries(devMap)
        .map(([device_type, count]) => ({ device_type, count }))
        .sort((a, b) => b.count - a.count)
    );

    setTotalViews(total || 0);
    setViews7d(recent || 0);
    setLoading(false);
  };

  const maxDaily = Math.max(...dailyViews.map((d) => d.count), 1);

  const getDeviceIcon = (type: string) => {
    if (type.toLowerCase().includes("mobile")) return <Smartphone className="w-4 h-4" />;
    if (type.toLowerCase().includes("desktop")) return <Monitor className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg truncate pr-8">📊 Analytics: {blogTitle}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Last 7 Days</p>
                <p className="text-3xl font-bold">{views7d.toLocaleString()}</p>
              </div>
            </div>

            {/* Daily Chart (simple bar) */}
            <div>
              <h4 className="text-sm font-medium mb-3">Daily Views (Last 7 Days)</h4>
              <div className="flex items-end gap-1 h-32">
                {dailyViews.map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">{d.count}</span>
                    <div
                      className="w-full bg-primary/80 rounded-t transition-all"
                      style={{ height: `${(d.count / maxDaily) * 100}%`, minHeight: d.count > 0 ? "4px" : "1px" }}
                    />
                    <span className="text-[10px] text-muted-foreground">{d.date.split(" ")[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geo */}
            {geoData.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Top Locations</h4>
                <div className="space-y-2">
                  {geoData.map((g, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">🌍 {g.city}, {g.country_name}</span>
                      <Badge variant="secondary">{g.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Devices */}
            {deviceData.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Devices</h4>
                <div className="flex gap-3 flex-wrap">
                  {deviceData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
                      {getDeviceIcon(d.device_type)}
                      <span className="capitalize">{d.device_type}</span>
                      <Badge variant="secondary" className="ml-1">{d.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogAnalyticsModal;
