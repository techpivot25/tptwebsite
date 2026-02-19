import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per session_id, 1 view per blog per 30 min)
const viewCache = new Map<string, number>();
const RATE_LIMIT_MS = 30 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { blog_id, session_id, referrer } = await req.json();

    if (!blog_id) {
      return new Response(JSON.stringify({ error: "blog_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Rate limit: deduplicate by session+blog
    const cacheKey = `${session_id || "anon"}_${blog_id}`;
    const lastView = viewCache.get(cacheKey);
    if (lastView && Date.now() - lastView < RATE_LIMIT_MS) {
      return new Response(JSON.stringify({ status: "duplicate" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    viewCache.set(cacheKey, Date.now());

    // Clean old cache entries periodically
    if (viewCache.size > 10000) {
      const now = Date.now();
      for (const [key, time] of viewCache) {
        if (now - time > RATE_LIMIT_MS) viewCache.delete(key);
      }
    }

    // Extract geo info from Cloudflare headers (available on deployed functions)
    const country_code = req.headers.get("cf-ipcountry") || req.headers.get("x-country-code") || null;
    const city = req.headers.get("cf-ipcity") || null;
    const state_code = req.headers.get("cf-region") || null;
    const country_name = req.headers.get("cf-ipcountry-name") || null;

    // Extract device type from user agent
    const userAgent = req.headers.get("user-agent") || "";
    let device_type = "desktop";
    if (/mobile|android|iphone|ipad/i.test(userAgent)) {
      device_type = /ipad|tablet/i.test(userAgent) ? "tablet" : "mobile";
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("blog_analytics").insert({
      blog_id,
      session_id: session_id || null,
      country_code,
      country_name,
      state_code,
      city,
      user_agent: userAgent.substring(0, 500),
      referrer: referrer?.substring(0, 500) || null,
      device_type,
    });

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to track" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "tracked" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Track error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
