import express from "express";
import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send-email-test", async (req, res) => {
  const { recipientEmail, content } = req.body;
  try {
    const cleanContent = sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
      disallowedTagsMode: 'escape',
      parseStyleAttributes: false,
      textFilter: function(text) {
        return text;
      }
    });

    const pacificTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const htmlContent = `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50; margin-bottom: 20px;">Here is the letter you sent on ${pacificTime}.</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
        <p style="white-space: pre-wrap; margin: 0;">${cleanContent}</p>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 20px; text-align: center;">
        This letter was sent by Emotionary's Time Capsule feature.
      </p>
    </div>`;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "emotionary@yahoo.com",
      subject: `Test Email from Resend`,
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
    const cleanContent = sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
      disallowedTagsMode: "escape",
      parseStyleAttributes: false,
      textFilter: function (text) {
        return text;
      },
    });

    const pacificTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const htmlContent = `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50; margin-bottom: 20px;">Here is the letter you sent on ${pacificTime}.</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
        <p style="white-space: pre-wrap; margin: 0;">${cleanContent}</p>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 20px; text-align: center;">
        This letter was sent by Emotionary's Time Capsule feature.
      </p>
    </div>`;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: `A Letter from the Past`,
      html: htmlContent,
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
