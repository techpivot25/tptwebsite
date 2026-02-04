import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  content: string;
  featured_image_url: string | null;
  video_url: string | null;
  publish_date: string | null;
  created_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        navigate("/blogs");
        return;
      }

      setBlog(data);
      setLoading(false);
    };

    fetchBlog();
  }, [slug, navigate]);

  // Estimate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <Skeleton className="h-64 w-full rounded-xl mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <>
      <Helmet>
        <title>{blog.title} | TechPivot Blog</title>
        <meta name="description" content={blog.subtitle || blog.title} />
        <link rel="canonical" href={`https://techpivot.com/blogs/${blog.slug}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.subtitle || blog.title} />
        {blog.featured_image_url && (
          <meta property="og:image" content={blog.featured_image_url} />
        )}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <article className="container mx-auto px-6 lg:px-12 max-w-4xl">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/blogs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {blog.title}
              </h1>
              {blog.subtitle && (
                <p className="text-xl text-muted-foreground mb-6">
                  {blog.subtitle}
                </p>
              )}
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(
                      new Date(blog.publish_date || blog.created_at),
                      "MMMM dd, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{getReadingTime(blog.content)} min read</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {blog.featured_image_url && (
              <div className="mb-10 rounded-2xl overflow-hidden">
                <img
                  src={blog.featured_image_url}
                  alt={blog.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Video */}
            {blog.video_url && (
              <div className="mb-10 rounded-2xl overflow-hidden aspect-video">
                <iframe
                  src={blog.video_url}
                  title={blog.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Back to Blog */}
            <div className="mt-16 pt-8 border-t border-border">
              <Button asChild>
                <Link to="/blogs">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Posts
                </Link>
              </Button>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
