import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Calendar, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { getCalApi } from "@calcom/embed-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface LeadFormData {
  name: string;
  mobile: string;
  company: string;
  country: string;
  service: string;
  budget: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  company?: string;
  country?: string;
  service?: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000, "Message is too long (max 4000 characters)"),
});

const services = [
  { value: "agentic-ai", label: "Agentic AI" },
  { value: "generative-ai", label: "Generative AI" },
  { value: "saas-platform", label: "SaaS Platform" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "cloud-security", label: "Cloud & Security" },
  { value: "staff-augmentation", label: "Staff Augmentation" },
  { value: "custom-software", label: "End-to-End Delivery" },
  { value: "iot", label: "IoT Solutions" },
  { value: "consultancy", label: "Consultancy" },
];

const countries = [
  { value: "india", label: "India" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "singapore", label: "Singapore" },
  { value: "other", label: "Other" },
];

const budgets = [
  { value: "evaluating", label: "Evaluating" },
  { value: "5k-25k", label: "$5K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" },
  { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k+", label: "More than $100K" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    mobile: "",
    company: "",
    country: "",
    service: "",
    budget: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm TechBot, TechPivot's AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Cal.com embed for chatbot
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "chatbot-consultation" });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#007bff" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      
      if (file.size > maxSize) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "File attached",
        description: `${file.name} ready to send`,
      });
    }
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    try {
      const fileContent = await fileToBase64(uploadedFile);
      
      // Send file via email
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: `chat-lead@techpivot.in`,
          company: formData.company.trim(),
          message: `Document shared via chat:\n\nFile: ${uploadedFile.name}\nMobile: ${formData.mobile}\nCountry: ${countries.find(c => c.value === formData.country)?.label || formData.country}\nInterested Service: ${services.find(s => s.value === formData.service)?.label || formData.service}`,
          timeline: "",
          budget: formData.budget,
          source: "Chat Widget - File Upload",
          isChatLead: true,
          mobile: formData.mobile.trim(),
          country: formData.country,
          service: formData.service,
          fileName: uploadedFile.name,
          fileContent: fileContent,
          fileType: uploadedFile.type
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Add message to chat
      setMessages(prev => [...prev, 
        { role: "user", content: `📎 Shared document: ${uploadedFile.name}` },
        { role: "assistant", content: `Thank you for sharing "${uploadedFile.name}"! Our team will review it and get back to you soon. Is there anything specific you'd like to discuss about this document?` }
      ]);
      
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast({
        title: "Document sent!",
        description: "Our team will review it shortly.",
      });
    } catch (err) {
      console.error("File upload error:", err);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to send document. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[\d\s\-+()]{8,20}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email notification
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: `chat-lead@techpivot.in`, // Placeholder for chat leads
          company: formData.company.trim(),
          message: `New chat lead from website:\n\nMobile: ${formData.mobile}\nCountry: ${countries.find(c => c.value === formData.country)?.label || formData.country}\nInterested Service: ${services.find(s => s.value === formData.service)?.label || formData.service}\nBudget: ${budgets.find(b => b.value === formData.budget)?.label || formData.budget || 'Not specified'}`,
          timeline: "",
          budget: formData.budget,
          source: "Chat Widget",
          isChatLead: true,
          mobile: formData.mobile.trim(),
          country: formData.country,
          service: formData.service,
        }
      });

      if (error) {
        console.error("Error sending lead:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit. Please try again.",
        });
        return;
      }

      setIsFormSubmitted(true);
      setMessages([
        {
          role: "assistant",
          content: `Thank you ${formData.name.split(' ')[0]}! 🎉 I'm TechBot, your AI assistant. I see you're interested in ${services.find(s => s.value === formData.service)?.label}. How can I help you learn more about our solutions?`,
        },
      ]);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const trimmedInput = input.trim().slice(0, 4000);

    try {
      messageSchema.parse({ role: "user", content: trimmedInput });

      const userMessage: Message = { role: "user", content: trimmedInput };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      let assistantContent = "";

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
      });
      setMessages((prev) => {
        if (prev[prev.length - 1]?.role === "assistant" && prev[prev.length - 1]?.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Toggle Button - Fixed position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{ position: 'fixed' }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 animate-pulse" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-40 right-6 z-[9998] w-[380px] max-w-[calc(100vw-3rem)] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        style={{ position: 'fixed' }}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">TechBot</h3>
                <p className="text-xs opacity-80">TechPivot's AI Assistant</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isFormSubmitted ? (
          /* Lead Capture Form */
          <div className="p-4 max-h-[450px] overflow-y-auto">
            {/* Greeting */}
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-sm">
                  👋 Hi there! Welcome to TechPivot! I'm here to help you explore our services. Please share a few details so I can assist you better.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <Input
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`h-10 text-sm ${errors.name ? 'border-destructive' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Input
                  placeholder="Mobile Number *"
                  value={formData.mobile}
                  onChange={(e) => {
                    setFormData({ ...formData, mobile: e.target.value });
                    if (errors.mobile) setErrors({ ...errors, mobile: undefined });
                  }}
                  className={`h-10 text-sm ${errors.mobile ? 'border-destructive' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <Input
                  placeholder="Company Name *"
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (errors.company) setErrors({ ...errors, company: undefined });
                  }}
                  className={`h-10 text-sm ${errors.company ? 'border-destructive' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
              </div>

              <div>
                <Select
                  value={formData.country}
                  onValueChange={(value) => {
                    setFormData({ ...formData, country: value });
                    if (errors.country) setErrors({ ...errors, country: undefined });
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`h-10 text-sm ${errors.country ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select Country *" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000] bg-background border border-border" position="popper" side="top" sideOffset={5}>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
              </div>

              <div>
                <Select
                  value={formData.service}
                  onValueChange={(value) => {
                    setFormData({ ...formData, service: value });
                    if (errors.service) setErrors({ ...errors, service: undefined });
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`h-10 text-sm ${errors.service ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select Service/Product *" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000] bg-background border border-border" position="popper" side="top" sideOffset={5}>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
              </div>

              <div>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Budget Range (Optional)" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000] bg-background border border-border" position="popper" side="top" sideOffset={5}>
                    {budgets.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Starting Chat...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Start Chat
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-3">
              🔒 Your information is secure and will not be shared.
            </p>
          </div>
        ) : (
          /* Chat Interface */
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-background border border-border rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.content === "" && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-background border border-border rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background space-y-2">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  data-cal-namespace="chatbot-consultation"
                  data-cal-link="techpivot-technologies-spt9na"
                  data-cal-config='{"layout":"month_view"}'
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Paperclip className="w-3 h-3 mr-1" />
                  Share Document
                </Button>
              </div>
              
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
              />
              
              {/* File preview */}
              {uploadedFile && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg text-xs">
                  <Paperclip className="w-3 h-3 text-primary" />
                  <span className="flex-1 truncate">{uploadedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      setUploadedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={handleFileUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Send"}
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBot;
