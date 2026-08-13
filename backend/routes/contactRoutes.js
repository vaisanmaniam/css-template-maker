import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields."
      });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // If credentials are configured in environment variables, send real email via Nodemailer
    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: emailUser,
        subject: `[NextGen Forge Feedback] ${subject || "New Feedback Received"}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
        html: `
          <h3>New Feedback / Suggestion Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr />
          <h4>Message:</h4>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.log("📩 [Contact Feedback Logged]:", { name, email, subject, message });
    }

    return res.json({
      success: true,
      message: "Feedback sent successfully"
    });
  } catch (error) {
    console.error("❌ Error sending feedback email:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send feedback"
    });
  }
});

export default router;
