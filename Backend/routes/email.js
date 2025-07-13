import express from "express";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter configuration (15 requests per 15 minutes)
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many scheduling requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/send-email-test", async (req, res) => {
    try {
        const content = "This is a test email sent using Resend API.";
        const htmlContent = `<p  style={{ fontSize: "12px" }}>${content}</p>`;
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "lavenderyu0113@gmail.com",
          subject: "Test Email from Resend",
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
            message: "Internal server error",
            error: error.message,
        });
    }
});

router.post("/schedule-email", emailLimiter, async (req, res) => {
  const { recipientEmail, content, scheduledTime } = req.body;

  
  if (!recipientEmail || !content || !scheduledTime) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required: recipientEmail, content, scheduledTime",
    });
  }

  
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(recipientEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format. Example: user@example.com",
    });
  }

  // Scheduled time validation (must be at least 10 minutes in future)
  const minScheduledTime = new Date(Date.now() + 10 * 60000);
  const selectedTime = new Date(scheduledTime);

  if (selectedTime < minScheduledTime) {
    return res.status(400).json({
      success: false,
      message: "Scheduled time must be at least 10 minutes in the future",
    });
  }

  try {
    // Sanitize HTML content
    const cleanContent = sanitizeHtml(content, {
      allowedTags: ["p", "br", "b", "i", "em", "strong", "ul", "ol", "li"],
      allowedAttributes: {},
    });

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: "A Letter from the Past",
      html: cleanContent,
      scheduled_at: selectedTime,
    });

    if (error) {
      console.error("Resend API error:", error);
      return res.status(500).json({
        success: false,
        message: "Email scheduling failed",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Email scheduled successfully",
      emailId: data.id,
      scheduledAt: selectedTime.toISOString(),
    });
  } catch (error) {
    console.error("Scheduling error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});


export default router;

