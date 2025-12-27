import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple validation functions (no external dependencies)
function validateMessage(msg: unknown): { role: string; content: string } | null {
  if (typeof msg !== 'object' || msg === null) return null;
  const m = msg as Record<string, unknown>;
  
  if (typeof m.role !== 'string' || !['user', 'assistant', 'system'].includes(m.role)) {
    return null;
  }
  
  if (typeof m.content !== 'string' || m.content.length === 0) {
    return null;
  }
  
  // Enforce max length of 4000 characters per message
  const content = m.content.slice(0, 4000);
  
  return { role: m.role, content };
}

function validateMessages(messages: unknown): { role: string; content: string }[] | null {
  if (!Array.isArray(messages)) return null;
  if (messages.length === 0 || messages.length > 50) return null;
  
  const validated: { role: string; content: string }[] = [];
  for (const msg of messages) {
    const validatedMsg = validateMessage(msg);
    if (!validatedMsg) return null;
    validated.push(validatedMsg);
  }
  
  return validated;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validatedMessages = validateMessages(body.messages);
    if (!validatedMessages) {
      console.error("Invalid messages format received:", JSON.stringify(body.messages).slice(0, 200));
      return new Response(
        JSON.stringify({ error: "Invalid request format. Messages must be an array with valid role and content." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing chat request with ${validatedMessages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are TechBot, TechPivot's AI Assistant. You help visitors learn about TechPivot Technologies & Consulting's services and guide them to the right solutions.

TechPivot offers these services:
- Agentic AI & Generative AI solutions
- SaaS Platform Development
- Custom Software Development
- Web Development
- Mobile App Development
- Cloud & Security Solutions
- IoT Solutions
- Staff Augmentation
- Software Consultancy

Be friendly, helpful, and concise. If someone wants to discuss a project, encourage them to visit the Contact page or schedule a consultation. Keep responses brief (2-3 sentences max) unless the user asks for more detail.`
          },
          ...validatedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded from AI gateway");
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("AI service payment required / unavailable");
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});