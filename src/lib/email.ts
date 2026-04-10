import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendToRuth(options: EmailOptions) {
  const ruthEmail = process.env.RUTH_EMAIL || "ruth@libertyenglishcreamgoldenretrievers.com";

  return resend.emails.send({
    from: "Liberty Goldens <noreply@libertyenglishcreamgoldenretrievers.com>",
    to: ruthEmail,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });
}
