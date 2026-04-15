import { Resend } from "resend";
import { SITE } from "./constants";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface EmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendToBreeder(options: EmailOptions) {
  const breederEmail = process.env.BREEDER_EMAIL || SITE.email;

  return getResend().emails.send({
    from: `${SITE.name} <noreply@${new URL(SITE.url).hostname}>`,
    to: breederEmail,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });
}

// Keep backward compat
export const sendToRuth = sendToBreeder;

const STATUS_EMAILS: Record<string, { subject: string; body: string }> = {
  reviewed: {
    subject: `Your application is being reviewed -- ${SITE.name}`,
    body: `We've received your application and are reviewing it now. We'll be in touch soon with next steps.`,
  },
  approved: {
    subject: `You're approved! -- ${SITE.name}`,
    body: `Great news! Your application has been approved. We'll reach out shortly to discuss next steps and available options.`,
  },
  waitlisted: {
    subject: `You're on our waitlist -- ${SITE.name}`,
    body: `You've been added to our waitlist. We'll notify you as soon as we have a match for you. Thank you for your patience!`,
  },
  matched: {
    subject: `You've been matched! -- ${SITE.name}`,
    body: `Exciting news! We've found a match for you. We'll be in touch with photos, details, and next steps to secure your new family member.`,
  },
  deposit_paid: {
    subject: `Deposit confirmed -- ${SITE.name}`,
    body: `Your deposit has been confirmed. Your new family member is reserved for you! We'll keep you updated as they grow and let you know when they're ready to come home.`,
  },
  ready_for_pickup: {
    subject: `Time to come home! -- ${SITE.name}`,
    body: `Your new family member is ready to come home! We'll be in touch to coordinate pickup details, what to bring, and everything you need to know for the big day.`,
  },
  completed: {
    subject: `Welcome to the family -- ${SITE.name}`,
    body: `Congratulations on your new family member! We're always here if you need anything. Don't hesitate to reach out with questions as they settle into their new home.`,
  },
};

export async function sendStatusEmail(buyerEmail: string, buyerName: string, newStatus: string) {
  const template = STATUS_EMAILS[newStatus];
  if (!template) return;

  const firstName = buyerName.split(" ")[0];

  return getResend().emails.send({
    from: `${SITE.name} <noreply@${new URL(SITE.url).hostname}>`,
    to: buyerEmail,
    subject: template.subject,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #142A53; margin-bottom: 16px;">Hi ${firstName},</h2>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">${template.body}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 13px;">
          ${SITE.name}<br />
          ${SITE.phone}<br />
          ${SITE.email}
        </p>
      </div>
    `,
    replyTo: process.env.BREEDER_EMAIL || SITE.email,
  });
}
