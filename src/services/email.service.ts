import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

/* =======================
   USER EMAIL
======================= */
export async function sendUserEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "The Pagination <hello@thepagination.com>",
      to: email,
      subject: "Thank you for contacting The Pagination!",
      html: `<p>Hi ${name},</p>
             <p>Thank you for reaching out! We will get back to you shortly.</p>
             <p>— The Pagination Team</p>`,
    });
    console.log("User email sent successfully!");
  } catch (err) {
    console.error("Error sending user email:", err);
    throw err;
  }
}

/* =======================
   ADMIN EMAIL
======================= */
export async function sendAdminEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: "The Pagination <hello@thepagination.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `<p><strong>Name:</strong> ${data.name}</p>
             <p><strong>Email:</strong> ${data.email}</p>
             <p><strong>Message:</strong></p>
             <p>${data.message}</p>`,
    });
    console.log("Admin email sent successfully!");
  } catch (err) {
    console.error("Error sending admin email:", err);
    throw err;
  }
}
