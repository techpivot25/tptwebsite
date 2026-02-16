import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Table,
  Palette,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EditorToolbarProps {
  editor: Editor | null;
}

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
];

const FONT_SIZES = [
  "12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "48px", "64px",
];

const TEXT_COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#cccccc", "#ffffff",
  "#ff0000", "#ff4444", "#ff8800", "#ffbb00", "#ffff00", "#88ff00",
  "#00ff00", "#00ff88", "#00ffff", "#0088ff", "#0000ff", "#8800ff",
  "#ff00ff", "#ff0088", "#880000", "#884400", "#888800", "#008800",
  "#008888", "#000088", "#440088", "#880088",
];

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const { toast } = useToast();

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const insertImageToEditor = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("blog-media")
      .upload(fileName, file);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data: { publicUrl } } = supabase.storage.from("blog-media").getPublicUrl(data.path);
      editor.chain().focus().setImage({ src: publicUrl }).run();
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const currentFontFamily = editor.getAttributes("textStyle").fontFamily || "";
  const currentFontSize = editor.getAttributes("textStyle").fontSize || "";
  const currentColor = editor.getAttributes("textStyle").color || "#000000";

  return (
    <div className="border-b border-border p-3 flex flex-wrap gap-1.5 items-center bg-muted/30">
      {/* Font Family */}
      <Select
        value={currentFontFamily}
        onValueChange={(value) => {
          if (value === "") {
            editor.chain().focus().unsetFontFamily().run();
          } else {
            editor.chain().focus().setFontFamily(value).run();
          }
        }}
      >
        <SelectTrigger className="w-[140px] h-8 text-xs">
          <SelectValue placeholder="Font" />
        </SelectTrigger>
        <SelectContent>
          {FONT_FAMILIES.map((font) => (
            <SelectItem key={font.value} value={font.value || "default"} style={{ fontFamily: font.value || "inherit" }}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Font Size */}
      <Select
        value={currentFontSize}
        onValueChange={(value) => {
          if (value === "default") {
            editor.chain().focus().unsetFontSize().run();
          } else {
            editor.chain().focus().setFontSize(value).run();
          }
        }}
      >
        <SelectTrigger className="w-[80px] h-8 text-xs">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          {FONT_SIZES.map((size) => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Text formatting */}
      <Button variant={editor.isActive("bold") ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive("italic") ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive("underline") ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon className="w-4 h-4" />
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Text Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Palette className="w-4 h-4" />
            <span
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="grid grid-cols-7 gap-1">
            {TEXT_COLORS.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => editor.chain().focus().setColor(color).run()}
                title={color}
              />
            ))}
          </div>
          <button
            className="mt-2 text-xs text-muted-foreground hover:text-foreground w-full text-left"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            Reset color
          </button>
        </PopoverContent>
      </Popover>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Headings */}
      <Button variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </Button>
      <Button variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        H3
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Lists */}
      <Button variant={editor.isActive("bulletList") ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive("orderedList") ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="w-4 h-4" />
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Alignment */}
      <Button variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <AlignLeft className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        <AlignCenter className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
        <AlignRight className="w-4 h-4" />
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Link */}
      <Button variant="ghost" size="sm" onClick={addLink}>
        <Link2 className="w-4 h-4" />
      </Button>

      {/* Image upload */}
      <label className="cursor-pointer">
        <input type="file" accept="image/*" onChange={insertImageToEditor} className="hidden" />
        <Button variant="ghost" size="sm" asChild>
          <span><ImageIcon className="w-4 h-4" /></span>
        </Button>
      </label>

      {/* Table */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={editor.isActive("table") ? "secondary" : "ghost"} size="sm">
            <Table className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={insertTable}>
              Insert Table (3×3)
            </Button>
            {editor.isActive("table") && (
              <>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().addColumnAfter().run()}>
                  Add Column After
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().addRowAfter().run()}>
                  Add Row After
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().deleteColumn().run()}>
                  Delete Column
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().deleteRow().run()}>
                  Delete Row
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-destructive" onClick={() => editor.chain().focus().deleteTable().run()}>
                  Delete Table
                </Button>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditorToolbar;
