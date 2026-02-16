import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TableKit } from "@tiptap/extension-table";
import { TextStyle, FontFamily, FontSize } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import {
  ArrowLeft,
  Save,
  Send,
  Calendar,
  Loader2,
  Upload,
  Video,
  Eye,
  PenLine,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import logoDark from "@/assets/logo-dark.png";
import EditorToolbar from "@/components/admin/EditorToolbar";

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TableKit,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert min-h-[500px] focus:outline-none px-6 py-4",
      },
    },
  });

  useEffect(() => {
    checkAuth();
    if (!isNew) {
      fetchBlog();
    }
  }, [id]);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
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

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      navigate("/admin/dashboard");
      return;
    }

    setTitle(data.title);
    setSubtitle(data.subtitle || "");
    setSlug(data.slug);
    setFeaturedImageUrl(data.featured_image_url || "");
    setVideoUrl(data.video_url || "");
    if (data.publish_date) {
      setPublishDate(new Date(data.publish_date));
    }
    if (data.scheduled_date) {
      const schedDate = new Date(data.scheduled_date);
      setScheduledDate(schedDate);
      setScheduledTime(format(schedDate, "HH:mm"));
    }
    editor?.commands.setContent(data.content);
    setLoading(false);
  };

  const generateSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }, []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("blog-media")
      .upload(fileName, file);

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-media").getPublicUrl(data.path);
      setFeaturedImageUrl(publicUrl);
      toast({ title: "Image uploaded successfully" });
    }
    setUploadingImage(false);
  };

  const handleSave = async (
    status: "draft" | "published" | "scheduled" = "draft"
  ) => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your blog post.",
        variant: "destructive",
      });
      return;
    }

    if (!editor?.getHTML()) {
      toast({
        title: "Content required",
        description: "Please add some content to your blog post.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const blogData = {
      title,
      subtitle: subtitle || null,
      slug: slug || generateSlug(title),
      content: editor.getHTML(),
      featured_image_url: featuredImageUrl || null,
      video_url: videoUrl || null,
      status,
      publish_date: status === "published" ? (publishDate?.toISOString() || new Date().toISOString()) : null,
      scheduled_date:
        status === "scheduled" && scheduledDate
          ? new Date(`${format(scheduledDate, "yyyy-MM-dd")}T${scheduledTime}`).toISOString()
          : null,
    };

    try {
      if (isNew) {
        const { error } = await supabase.from("blogs").insert([blogData]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", id);
        if (error) throw error;
      }

      toast({
        title:
          status === "published"
            ? "Published!"
            : status === "scheduled"
            ? "Scheduled!"
            : "Saved!",
        description:
          status === "published"
            ? "Your blog post is now live."
            : status === "scheduled"
            ? `Scheduled for ${format(scheduledDate!, "MMM dd, yyyy")} at ${scheduledTime}`
            : "Your draft has been saved.",
      });

      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
      setShowScheduleDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isNew ? "New Post" : "Edit Post"} | TechPivot CMS</title>
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
                  Back
                </Link>
              </Button>
              <img src={logoDark} alt="TechPivot" className="h-8" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={previewMode ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? (
                  <>
                    <PenLine className="w-4 h-4 mr-2" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowScheduleDialog(true)}
                disabled={saving}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button onClick={() => handleSave("published")} disabled={saving}>
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Publish Now
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Title & Subtitle */}
          <div className="space-y-6 mb-8">
            <div>
              <Label htmlFor="title">Heading</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog title..."
                className="text-2xl font-bold h-14 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Sub Heading</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Enter a brief subtitle..."
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                placeholder="blog-post-url"
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                /blogs/{slug || "your-post-url"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-2 justify-start text-left font-normal"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {publishDate
                        ? format(publishDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={publishDate}
                      onSelect={setPublishDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id="featuredImage"
                    value={featuredImageUrl}
                    onChange={(e) => setFeaturedImageUrl(e.target.value)}
                    placeholder="Image URL or upload"
                    className="flex-1"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      type="button"
                      disabled={uploadingImage}
                      asChild
                    >
                      <span>
                        {uploadingImage ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="video">Video URL (YouTube/Vimeo embed)</Label>
              <div className="flex items-center gap-2 mt-2">
                <Video className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="video"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>
            </div>
          </div>

          {/* Rich Text Editor / Preview */}
          <div className="bg-background rounded-xl border border-border overflow-hidden">
            {previewMode ? (
              <div className="px-6 py-4">
                {featuredImageUrl && (
                  <img
                    src={featuredImageUrl}
                    alt={title}
                    className="w-full max-h-96 object-cover rounded-lg mb-6"
                  />
                )}
                {videoUrl && (
                  <div className="aspect-video mb-6">
                    <iframe
                      src={videoUrl}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-2">{title || "Untitled Post"}</h1>
                {subtitle && (
                  <p className="text-lg text-muted-foreground mb-4">{subtitle}</p>
                )}
                {publishDate && (
                  <p className="text-sm text-muted-foreground mb-6">
                    {format(publishDate, "MMMM dd, yyyy")}
                  </p>
                )}
                <div
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
                />
              </div>
            ) : (
              <>
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
              </>
            )}
          </div>
        </main>

        {/* Schedule Dialog */}
        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Schedule Post
              </DialogTitle>
              <DialogDescription>
                Select a date and time to publish this post automatically.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-2 justify-start text-left font-normal"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {scheduledDate
                        ? format(scheduledDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="scheduleTime">Schedule Time</Label>
                <Input
                  id="scheduleTime"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowScheduleDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSave("scheduled")}
                disabled={!scheduledDate || saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Calendar className="w-4 h-4 mr-2" />
                )}
                Confirm Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BlogEditor;
