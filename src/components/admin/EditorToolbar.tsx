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
  AlignJustify,
  Link2,
  Image as ImageIcon,
  Table,
  Palette,
  Paintbrush,
  MergeIcon,
  SplitIcon,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
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
  { label: "Default", value: "default" },
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

const CELL_BG_COLORS = [
  "transparent", "#f8f9fa", "#e9ecef", "#dee2e6",
  "#fff3cd", "#d4edda", "#d1ecf1", "#cce5ff",
  "#f8d7da", "#e2e3e5", "#fce4ec", "#e8f5e9",
  "#e3f2fd", "#fff8e1", "#f3e5f5", "#e0f7fa",
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

  const currentFontFamily = editor.getAttributes("textStyle").fontFamily || "default";
  const currentFontSize = editor.getAttributes("textStyle").fontSize || "default";
  const currentColor = editor.getAttributes("textStyle").color || "#000000";
  const isTableActive = editor.isActive("table");

  return (
    <div className="border-b border-border p-3 flex flex-wrap gap-1.5 items-center bg-muted/30">
      {/* Font Family */}
      <Select
        value={currentFontFamily}
        onValueChange={(value) => {
          if (value === "default") {
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
            <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value === "default" ? "inherit" : font.value }}>
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
      <Button variant={editor.isActive("bold") ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive("italic") ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
        <Italic className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive("underline") ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
        <UnderlineIcon className="w-4 h-4" />
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Text Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative" title="Text Color">
            <Palette className="w-4 h-4" />
            <span
              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <p className="text-xs font-medium mb-2 text-muted-foreground">Text Color</p>
          <div className="grid grid-cols-7 gap-1.5">
            {TEXT_COLORS.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-border hover:scale-125 transition-transform"
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
      <Button variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"} size="sm" className="h-8 px-2 text-xs font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
        H1
      </Button>
      <Button variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"} size="sm" className="h-8 px-2 text-xs font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
        H2
      </Button>
      <Button variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"} size="sm" className="h-8 px-2 text-xs font-bold" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
        H3
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Lists */}
      <Button variant={editor.isActive("bulletList") ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
        <List className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive("orderedList") ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
        <ListOrdered className="w-4 h-4" />
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Alignment */}
      <Button variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align Left">
        <AlignLeft className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align Center">
        <AlignCenter className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align Right">
        <AlignRight className="w-4 h-4" />
      </Button>
      <Button variant={editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().setTextAlign("justify").run()} title="Justify">
        <AlignJustify className="w-4 h-4" />
      </Button>

      <div className="w-px bg-border mx-1 h-6" />

      {/* Link */}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={addLink} title="Insert Link">
        <Link2 className="w-4 h-4" />
      </Button>

      {/* Image upload */}
      <label className="cursor-pointer">
        <input type="file" accept="image/*" onChange={insertImageToEditor} className="hidden" />
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild title="Insert Image">
          <span><ImageIcon className="w-4 h-4" /></span>
        </Button>
      </label>

      {/* Table */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={isTableActive ? "secondary" : "ghost"} size="icon" className="h-8 w-8" title="Table">
            <Table className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          <div className="space-y-1">
            {!isTableActive && (
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={insertTable}>
                <Plus className="w-3 h-3 mr-2" />
                Insert Table (3×3)
              </Button>
            )}
            {isTableActive && (
              <>
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Rows & Columns</p>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().addColumnBefore().run()}>
                  <ArrowLeft className="w-3 h-3 mr-2" />
                  Add Column Before
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().addColumnAfter().run()}>
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Add Column After
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().addRowBefore().run()}>
                  <ArrowUp className="w-3 h-3 mr-2" />
                  Add Row Before
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().addRowAfter().run()}>
                  <ArrowDown className="w-3 h-3 mr-2" />
                  Add Row After
                </Button>

                <div className="border-t border-border my-1" />
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Merge & Split</p>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().mergeCells().run()}>
                  <MergeIcon className="w-3 h-3 mr-2" />
                  Merge Cells
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().splitCell().run()}>
                  <SplitIcon className="w-3 h-3 mr-2" />
                  Split Cell
                </Button>

                <div className="border-t border-border my-1" />
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Cell Background</p>
                <div className="grid grid-cols-8 gap-1 px-2 pb-1">
                  {CELL_BG_COLORS.map((color) => (
                    <button
                      key={color}
                      className="w-5 h-5 rounded border border-border hover:scale-125 transition-transform"
                      style={{ backgroundColor: color === "transparent" ? "transparent" : color }}
                      onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', color === "transparent" ? null : color).run()}
                      title={color === "transparent" ? "No color" : color}
                    >
                      {color === "transparent" && <span className="text-[8px] text-muted-foreground">✕</span>}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border my-1" />
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Delete</p>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().deleteColumn().run()}>
                  <Trash2 className="w-3 h-3 mr-2" />
                  Delete Column
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => editor.chain().focus().deleteRow().run()}>
                  <Trash2 className="w-3 h-3 mr-2" />
                  Delete Row
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-destructive hover:text-destructive" onClick={() => editor.chain().focus().deleteTable().run()}>
                  <Trash2 className="w-3 h-3 mr-2" />
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
