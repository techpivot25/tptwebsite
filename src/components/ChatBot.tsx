import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type UserDetails = {
  name: string;
  company: string;
  mobile: string;
  email: string;
  service: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SERVICES = [
  "Agentic AI",
  "Generative AI",
  "SaaS Platform",
  "Web Development",
  "Mobile Apps",
  "Cloud & Security",
  "Staff Augmentation",
  "End-to-End Delivery",
  "IoT Solutions",
  "Consultancy",
] as const;

// Validation schemas
const userDetailsSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  company: z.string().trim().min(1, "Company is required").max(200, "Company name must be less than 200 characters"),
  mobile: z.string().trim().min(1, "Mobile number is required").max(20, "Mobile number is too long").regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
    "Please enter a valid phone number"
  ),
  email: z.string().trim().email("Please enter a valid email address").max(254, "Email is too long"),
  service: z.enum(SERVICES, { errorMap: () => ({ message: "Please select a service" }) }),
});

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000, "Message is too long (max 4000 characters)"),
});

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    company: "",
    mobile: "",
    email: "",
    service: "",
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm TechBot, TechPivot's AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to database whenever they change
  useEffect(() => {
    if (sessionId && messages.length > 1) {
      const saveMessages = async () => {
        await supabase
          .from("chat_sessions")
          .update({ messages: messages })
          .eq("id", sessionId);
      };
      saveMessages();
    }
  }, [messages, sessionId]);

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      userDetails.name.trim() !== "" &&
      userDetails.company.trim() !== "" &&
      userDetails.mobile.trim() !== "" &&
      userDetails.email.trim() !== "" &&
      userDetails.service !== ""
    );
  };

  const handleStartChat = async () => {
    if (!isFormValid()) {
      toast({
        variant: "destructive",
        title: "Please fill all fields",
        description: "All fields are required to start the chat.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate user details with Zod
      const validatedDetails = userDetailsSchema.parse(userDetails);
      
      // Validate messages
      const validatedMessages = messages.map(msg => messageSchema.parse(msg));

      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({
          name: validatedDetails.name,
          company: validatedDetails.company,
          mobile: validatedDetails.mobile,
          email: validatedDetails.email,
          service: validatedDetails.service,
          messages: validatedMessages,
        })
        .select("id")
        .single();

      if (error) throw error;

      setSessionId(data.id);
      setChatStarted(true);
      
      // Add personalized greeting
      setMessages([
        {
          role: "assistant",
          content: `Hi ${validatedDetails.name}! I'm TechBot, TechPivot's AI Assistant. I see you're interested in ${validatedDetails.service}. How can I help you today?`,
        },
      ]);

      toast({
        title: "Chat started",
        description: "You can now start chatting with TechBot.",
      });
    } catch (error) {
      console.error("Error starting chat:", error);
      
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error.errors[0].message,
        });
        setIsSubmitting(false);
        return;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start chat. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Validate message length
    const trimmedInput = input.trim().slice(0, 4000);
    
    try {
      // Validate the message
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

      // Add empty assistant message to update
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
      // Remove the empty assistant message if error
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
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "rotate-0" : "animate-pulse"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-40 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">TechBot</h3>
              <p className="text-xs opacity-80">TechPivot's AI Assistant</p>
            </div>
          </div>
        </div>

        {!chatStarted ? (
          /* Pre-Chat Form */
          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            <p className="text-sm text-muted-foreground">
              Please fill in your details to start chatting with TechBot.
            </p>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={userDetails.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-sm">Company *</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={userDetails.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-sm">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Your mobile number"
                  value={userDetails.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={userDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="service" className="text-sm">Service Interested In *</Label>
                <Select
                  value={userDetails.service}
                  onValueChange={(value) => handleInputChange("service", value)}
                >
                  <SelectTrigger id="service" className="h-9 bg-background">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[100]">
                    {SERVICES.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleStartChat}
              disabled={!isFormValid() || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Starting..." : "Start Chat"}
            </Button>
          </div>
        ) : (
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
            <div className="p-4 border-t border-border bg-background">
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