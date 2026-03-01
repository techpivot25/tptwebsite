import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  featured_image_url: string | null;
  publish_date: string | null;
  created_at: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, subtitle, slug, featured_image_url, publish_date, created_at")
      .eq("status", "published")
      .order("publish_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      setBlogs([]);
      setErrorMessage("Unable to load blogs right now. Please check your connection and try again.");
    } else {
      setBlogs(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <Helmet>
        <title>Blog | TechPivot Technologies & Consulting</title>
        <meta
          name="description"
          content="Stay updated with the latest insights, trends, and news in AI, SaaS, cloud solutions, and digital transformation from TechPivot."
        />
        <link rel="canonical" href="https://techpivot.com/blogs" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our <span className="text-primary">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Insights, trends, and expert perspectives on AI, technology, and digital transformation.
              </p>
            </div>

            {/* Blog Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : errorMessage ? (
              <div className="text-center py-20 space-y-4">
                <p className="text-xl text-muted-foreground">{errorMessage}</p>
                <Button variant="outline" onClick={fetchBlogs}>Try Again</Button>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blogs/${blog.slug}`}
                    className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      {blog.featured_image_url ? (
                        <img
                          src={blog.featured_image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/30">TP</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(
                            new Date(blog.publish_date || blog.created_at),
                            "MMM dd, yyyy"
                          )}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      {blog.subtitle && (
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {blog.subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-primary font-medium">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blogs;
