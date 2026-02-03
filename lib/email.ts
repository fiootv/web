import nodemailer from "nodemailer";
import {
  contactConfirmationHtml,
  contactNotificationHtml,
  orderConfirmationHtml,
  orderNotificationHtml,
} from "./email-templates";

const RESEND_HOST = process.env.RESEND_HOST;
const RESEND_PORT = process.env.RESEND_PORT;
const RESEND_USER = process.env.RESEND_USER;
const RESEND_PASSWORD = process.env.RESEND_PASSWORD;
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "noreply@fiootv.com";

function getAdminEmails(): string[] {
  const raw = process.env.RESEND_ADMIN_EMAIL;
  if (!raw?.trim()) return [];
  return raw.split(",").map((e) => e.trim()).filter(Boolean);
}

export function isEmailConfigured(): boolean {
  return !!(RESEND_HOST && RESEND_PORT && RESEND_USER && RESEND_PASSWORD);
}

function createTransport() {
  if (!isEmailConfigured()) return null;
  return nodemailer.createTransport({
    host: RESEND_HOST,
    port: Number(RESEND_PORT),
    secure: RESEND_PORT === "465",
    auth: {
      user: RESEND_USER,
      pass: RESEND_PASSWORD,
    },
  });
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ success: boolean; error?: string }> {
  const transport = createTransport();
  if (!transport) {
    return { success: false, error: "Email not configured" };
  }

  try {
    await transport.sendMail({
      from: RESEND_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("Email send error:", message);
    return { success: false, error: message };
  }
}

export async function sendContactNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) return { success: false, error: "Admin email not configured" };

  const subject = `[${data.source}] New contact form submission from ${data.firstName} ${data.lastName}`;
  const html = contactNotificationHtml(data);

  return sendEmail({ to: adminEmails.join(", "), subject, html });
}

export async function sendContactConfirmation(data: {
  firstName: string;
  email: string;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const subject = `We received your message - ${data.source}`;
  const html = contactConfirmationHtml(data);

  return sendEmail({ to: data.email, subject, html });
}

export async function sendOrderNotification(data: {
  planDisplayDuration: string;
  planPrice: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  paymentMethod: string;
  orderNotes?: string;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) return { success: false, error: "Admin email not configured" };

  const subject = `[${data.source}] New order: ${data.planDisplayDuration} - ${data.customerName}`;
  const html = orderNotificationHtml(data);

  return sendEmail({ to: adminEmails.join(", "), subject, html });
}

export async function sendOrderConfirmation(data: {
  firstName: string;
  email: string;
  planDisplayDuration: string;
  planPrice: string;
  planDuration?: string;
  paymentMethod: string;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const subject = `Order confirmation - ${data.source}`;
  const html = orderConfirmationHtml(data);

  return sendEmail({ to: data.email, subject, html });
}
