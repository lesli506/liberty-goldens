import { Resend } from "resend";

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

export async function sendToRuth(options: EmailOptions) {
  const ruthEmail = process.env.RUTH_EMAIL || "ruth@libertyenglishcreamgoldenretrievers.com";

  return getResend().emails.send({
    from: "Liberty Goldens <noreply@libertyenglishcreamgoldenretrievers.com>",
    to: ruthEmail,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });
}
