import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Lower than chat (emails are more expensive)

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() 
    || req.headers.get('x-real-ip') 
    || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitMap.get(ip);
  
  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  existing.count++;
  return true;
}

interface ContactFormRequest {
  name: string;
  email: string;
  company: string;
  message: string;
  timeline: string;
  budget: string;
  source: string;
  fileName?: string;
  fileContent?: string; // Base64 encoded file content
  fileType?: string;
  // Chat lead specific fields
  isChatLead?: boolean;
  mobile?: string;
  country?: string;
  service?: string;
}

async function sendEmail(
  client: SMTPClient,
  to: string,
  subject: string,
  html: string,
  attachment?: { filename: string; content: Uint8Array; contentType: string }
) {
  const emailConfig: any = {
    from: "TechPivot <techpivot25@gmail.com>",
    to: to,
    subject: subject,
    html: html,
  };

  if (attachment) {
    emailConfig.attachments = [
      {
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      },
    ];
  }

  await client.send(emailConfig);
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Check rate limit
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { 
      name, 
      email, 
      company, 
      message, 
      timeline, 
      budget, 
      source, 
      fileName,
      fileContent,
      fileType,
      isChatLead,
      mobile,
      country,
      service
    }: ContactFormRequest = await req.json();

    console.log(`Processing contact form from IP: ${clientIP}`, { name, email, company, timeline, budget, source, isChatLead, mobile, country, service, hasFile: !!fileContent });

    // Validate required fields
    if (!name) {
      console.error("Missing required field: name");
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // For chat leads, validate mobile instead of email
    if (isChatLead) {
      if (!mobile) {
        console.error("Missing required field for chat lead: mobile");
        return new Response(
          JSON.stringify({ error: "Mobile number is required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    } else {
      // Regular contact form validation
      if (!email || !message) {
        console.error("Missing required fields");
        return new Response(
          JSON.stringify({ error: "Name, email, and message are required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Email validation for regular form
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error("Invalid email format");
        return new Response(
          JSON.stringify({ error: "Invalid email format" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    }

    // Initialize SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: "techpivot25@gmail.com",
          password: Deno.env.get("GMAIL_APP_PASSWORD") || "",
        },
      },
    });

    // Format labels
    const timelineLabels: Record<string, string> = {
      "immediate": "Immediately (0–1 month)",
      "1-3months": "Within 1–3 months",
      "3-6months": "Within 3–6 months",
      "6+months": "Within 6+ months",
      "exploring": "Exploring / need consultation"
    };

    const budgetLabels: Record<string, string> = {
      "evaluating": "Evaluating",
      "5k-25k": "$5K - $25K",
      "25k-50k": "$25K - $50K",
      "50k-100k": "$50K - $100K",
      "100k+": "More than $100K"
    };

    const sourceLabels: Record<string, string> = {
      "social-media": "Social Media",
      "linkedin": "LinkedIn",
      "referral": "Referral",
      "clutch": "Clutch",
      "google": "Google Search",
      "Chat Widget": "Chat Widget"
    };

    const countryLabels: Record<string, string> = {
      "india": "India",
      "usa": "United States",
      "canada": "Canada",
      "uae": "United Arab Emirates",
      "uk": "United Kingdom",
      "australia": "Australia",
      "germany": "Germany",
      "singapore": "Singapore",
      "other": "Other"
    };

    const serviceLabels: Record<string, string> = {
      "agentic-ai": "Agentic AI",
      "generative-ai": "Generative AI",
      "saas-platform": "SaaS Platform",
      "web-development": "Web Development",
      "mobile-apps": "Mobile Apps",
      "cloud-security": "Cloud & Security",
      "staff-augmentation": "Staff Augmentation",
      "custom-software": "End-to-End Delivery",
      "iot": "IoT Solutions",
      "consultancy": "Consultancy"
    };

    // Prepare attachment if file was uploaded
    let attachment: { filename: string; content: Uint8Array; contentType: string } | undefined;
    if (fileContent && fileName) {
      try {
        // Decode base64 content
        const binaryString = atob(fileContent);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        attachment = {
          filename: fileName,
          content: bytes,
          contentType: fileType || "application/octet-stream",
        };
        console.log("File attachment prepared:", fileName);
      } catch (e) {
        console.error("Error processing file attachment:", e);
      }
    }

    // Build email content
    let adminEmailSubject: string;
    let adminEmailHtml: string;

    if (isChatLead) {
      adminEmailSubject = `🤖 New Chat Lead from ${name}`;
      adminEmailHtml = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">🤖 New Chat Widget Lead</h2><table style="width: 100%; border-collapse: collapse; margin-top: 20px;"><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Mobile:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${mobile}">${mobile}</a></td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Country:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${country ? countryLabels[country] || country : "Not specified"}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Interested Service:</td><td style="padding: 10px; border-bottom: 1px solid #eee; color: #10b981; font-weight: bold;">${service ? serviceLabels[service] || service : "Not specified"}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${budget ? budgetLabels[budget] || budget : "Not specified"}</td></tr></table><div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-radius: 5px; border-left: 4px solid #10b981;"><p style="margin: 0; color: #065f46;"><strong>Lead Source:</strong> Chat Widget on Website<br><strong>Action Required:</strong> Follow up with this potential customer promptly.</p></div><p style="margin-top: 30px; color: #666; font-size: 12px;">This lead was captured via the TechPivot website chat widget.</p></div>`;
    } else {
      adminEmailSubject = `📩 New Contact Form Submission from ${name}`;
      const fileRow = fileName ? `<tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Attached File:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">📎 ${fileName}</td></tr>` : "";
      adminEmailHtml = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">📩 New Contact Form Submission</h2><table style="width: 100%; border-collapse: collapse; margin-top: 20px;"><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Timeline:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${timeline ? timelineLabels[timeline] || timeline : "Not specified"}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${budget ? budgetLabels[budget] || budget : "Not specified"}</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">How they found us:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${source ? sourceLabels[source] || source : "Not specified"}</td></tr>${fileRow}</table><div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;"><h3 style="margin-top: 0; color: #333;">Message:</h3><p style="white-space: pre-wrap; line-height: 1.6;">${message}</p></div><p style="margin-top: 30px; color: #666; font-size: 12px;">This email was sent from the TechPivot website contact form.</p></div>`;
    }

    // Send email to admin (info@techpivot.in)
    await sendEmail(client, "info@techpivot.in", adminEmailSubject, adminEmailHtml, attachment);
    console.log("Admin notification email sent successfully");

    // Send welcome email to user (only for contact form, not chat leads)
    if (!isChatLead && email) {
      const welcomeEmailSubject = "Thank you for contacting TechPivot Technologies!";
      const welcomeEmailHtml = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="text-align: center; margin-bottom: 30px;"><h1 style="color: #333; margin: 0;">TechPivot Technologies</h1><p style="color: #666; font-size: 14px;">Transforming Ideas into Digital Reality</p></div><h2 style="color: #007bff;">Hello ${name}!</h2><p style="color: #333; line-height: 1.8;">Thank you for reaching out to us! We've received your message and our team will review your inquiry shortly.</p><div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"><h3 style="color: #333; margin-top: 0;">What happens next?</h3><ul style="color: #555; line-height: 1.8;"><li>Our team will review your requirements within 24 hours</li><li>A dedicated consultant will reach out to discuss your project</li><li>We'll provide a customized solution proposal</li></ul></div><p style="color: #333; line-height: 1.8;">In the meantime, feel free to explore our services and case studies at <a href="https://techpivot.in" style="color: #007bff;">techpivot.in</a></p><div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;"><p style="color: #666; font-size: 14px; margin: 0;">Best regards,<br><strong style="color: #333;">The TechPivot Team</strong></p><p style="color: #999; font-size: 12px; margin-top: 10px;">info@techpivot.in<br>India &bull; USA &bull; Canada &bull; UAE</p></div></div>`;
      
      await sendEmail(client, email, welcomeEmailSubject, welcomeEmailHtml);
      console.log("Welcome email sent to user:", email);
    }

    // Close SMTP connection
    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
