import express from "express";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send-email-test", async (req, res) => {
  const { recipientEmail, content } = req.body;
  try {
    const htmlContent = `<p  style={{ fontSize: "12px" }}>${content}</p>`;
    const pacificTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "emotionary@yahoo.com",
      subject: `Test Email from Resend – ${pacificTime}`,
      html: htmlContent,
    });
    if (error) {
      console.error("Resend API error:", error);
      return res.status(500).json({
        success: false,
        message: "Email sending failed",
        error: error.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Test email sent successfully",
      emailId: data.id,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
});

router.post("/schedule-email", async (req, res) => {
  const { recipientEmail, content, scheduledTime } = req.body;

  if (!recipientEmail || !content || !scheduledTime) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required: recipientEmail, content, scheduledTime",
    });
  }
  
  try {
    // Sanitize content
    const cleanContent = sanitizeHtml(content, {
      allowedTags: ["p", "br", "b", "i", "em", "strong", "ul", "ol", "li"],
      allowedAttributes: {},
    });
    
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: "A Letter from the Past",
      html: cleanContent,
      scheduledAt: scheduledTime,
    });

    if (error) {
        console.error("Resend API error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Email scheduling failed",
            error: error.message,
        });
    }

    res.status(200).json({
      success: true,
      message: "Email scheduled successfully",
      scheduledAt: scheduledTime,
    });

  } catch (error) {
    console.error("Scheduling error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
});

export default router;
