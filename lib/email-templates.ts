const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";
const BRAND = "fiootv";
const PRIMARY = "#ef2828";
const SUPPORT_EMAIL = "support@fiootv.com";
const SUPPORT_PHONE = "+1-855-561-4578";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.5;color:#333;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;">
        <tr>
          <td style="padding:24px 24px 16px;border-bottom:3px solid ${PRIMARY};">
            <a href="${SITE_URL}" style="text-decoration:none;font-size:24px;font-weight:700;color:#111;">
              <span style="color:#111;">fioo</span><span style="color:${PRIMARY};">tv</span>
            </a>
          </td>
        </tr>
        <tr><td style="padding:24px;">${content}</td></tr>
        <tr>
          <td style="padding:24px;border-top:1px solid #eee;font-size:12px;color:#666;">
            <p style="margin:0 0 8px;"><strong style="color:#333;">${BRAND}</strong></p>
            <p style="margin:0 0 4px;"><a href="mailto:${SUPPORT_EMAIL}" style="color:${PRIMARY};text-decoration:none;">${SUPPORT_EMAIL}</a></p>
            <p style="margin:0 0 4px;"><a href="tel:${SUPPORT_PHONE.replace(/\s/g, "")}" style="color:${PRIMARY};text-decoration:none;">${SUPPORT_PHONE}</a></p>
            <p style="margin:16px 0 0;color:#999;">&copy; ${new Date().getFullYear()} ${BRAND}. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function contactConfirmationHtml(data: { firstName: string; source: string }): string {
  const firstName = escapeHtml(data.firstName);
  const content = `
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#111;">Thank you for reaching out!</h2>
    <p style="margin:0 0 12px;">Hi ${firstName},</p>
    <p style="margin:0 0 12px;">We've received your message and will get back to you as soon as possible. Our team typically responds within 24–48 hours.</p>
    <p style="margin:0;color:#666;">Best regards,<br /><span style="color:${PRIMARY};font-weight:500;">The ${data.source} Team</span></p>`;
  return emailWrapper(content);
}

export function orderConfirmationHtml(data: {
  firstName: string;
  planDisplayDuration: string;
  planPrice: string;
  planDuration?: string;
  paymentMethod: string;
  source: string;
}): string {
  const firstName = escapeHtml(data.firstName);
  const paymentLabel = data.paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : data.paymentMethod;
  const content = `
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#111;">Order confirmed</h2>
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">We've received your order. Here are the details:</p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 16px;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;">Plan</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:500;text-align:right;">${escapeHtml(data.planDisplayDuration)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;">Price</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:500;text-align:right;color:${PRIMARY};">$${escapeHtml(String(data.planPrice))}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Payment</td><td style="padding:8px 0;font-weight:500;text-align:right;">${escapeHtml(paymentLabel)}</td></tr>
    </table>
    <p style="margin:0 0 12px;color:#666;font-size:14px;">Our team will process your order and get in touch with you shortly.</p>
    <p style="margin:0;color:#666;">Best regards,<br /><span style="color:${PRIMARY};font-weight:500;">The ${data.source} Team</span></p>`;
  return emailWrapper(content);
}

export function contactNotificationHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
}): string {
  const content = `
    <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#111;">New contact form submission</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#666;width:100px;">Name</td><td style="padding:6px 0;">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:${PRIMARY};">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${data.phone ? escapeHtml(data.phone) : "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Source</td><td style="padding:6px 0;">${escapeHtml(data.source)}</td></tr>
    </table>
    <p style="margin:16px 0 0;padding-top:16px;border-top:1px solid #eee;"><strong style="color:#666;">Message:</strong></p>
    <p style="margin:8px 0 0;white-space:pre-wrap;">${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>`;
  return emailWrapper(content);
}

export function orderNotificationHtml(data: {
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
}): string {
  const addr = [data.address, data.city, data.state, data.country, data.zipCode].filter(Boolean).join(", ") || "—";
  const paymentLabel = data.paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : data.paymentMethod;
  const content = `
    <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#111;">New order received</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#666;width:120px;">Plan</td><td style="padding:6px 0;">${escapeHtml(data.planDisplayDuration)}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Price</td><td style="padding:6px 0;color:${PRIMARY};font-weight:600;">$${escapeHtml(data.planPrice)}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Customer</td><td style="padding:6px 0;">${escapeHtml(data.customerName)}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.customerEmail)}" style="color:${PRIMARY};">${escapeHtml(data.customerEmail)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${data.customerPhone ? escapeHtml(data.customerPhone) : "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Payment</td><td style="padding:6px 0;">${escapeHtml(paymentLabel)}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Address</td><td style="padding:6px 0;">${escapeHtml(addr)}</td></tr>
      ${data.orderNotes ? `<tr><td style="padding:6px 0;color:#666;">Notes</td><td style="padding:6px 0;">${escapeHtml(data.orderNotes)}</td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#666;">Source</td><td style="padding:6px 0;">${escapeHtml(data.source)}</td></tr>
    </table>`;
  return emailWrapper(content);
}
