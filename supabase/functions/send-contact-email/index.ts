import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  company: string;
  message: string;
  timeline: string;
  budget: string;
  source: string;
  fileName?: string;
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, timeline, budget, source, fileName }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, company, timeline, budget, source });

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email validation
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

    // Format the timeline and budget for display
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
      "google": "Google Search"
    };

    // Send email to info@techpivot.in
    const emailResponse = await resend.emails.send({
      from: "TechPivot Contact Form <techpivot25@gmail.com>",
      to: ["info@techpivot.in"],
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Timeline:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${timeline ? timelineLabels[timeline] || timeline : "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${budget ? budgetLabels[budget] || budget : "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">How they found us:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${source ? sourceLabels[source] || source : "Not specified"}</td>
            </tr>
            ${fileName ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Attached File:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${fileName}</td>
            </tr>
            ` : ""}
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This email was sent from the TechPivot website contact form.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
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
