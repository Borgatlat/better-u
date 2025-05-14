interface EmailTemplateProps {
  email: string
  subject?: string
  previewText?: string
  content?: string
}

export default function EmailTemplate({
  email,
  subject = "Welcome to BetterU AI Waitlist",
  previewText = "Thank you for joining our waitlist!",
  content = "We've received your email address and will keep you updated on our progress.",
}: EmailTemplateProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${previewText}">
      </head>
      <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; padding: 20px; background-color: #f9fafb; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <img src="https://betteruai.com/logo.png" alt="BetterU AI Logo" style="display: block; margin: 0 auto 20px; max-width: 150px; height: auto;">
          
          <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px; text-align: center;">${subject}</h1>
          
          <div style="color: #374151; font-size: 16px; margin-bottom: 24px;">
            ${content.replace(/\n/g, "<br>")}
          </div>
          
          <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
            <p style="color: #374151; font-size: 14px; margin-bottom: 8px;">Best regards,</p>
            <p style="color: #111827; font-size: 16px; font-weight: 500;">The BetterU AI Team</p>
          </div>
          
          <div style="margin-top: 32px; font-size: 12px; color: #6b7280; text-align: center;">
            <p>You're receiving this email because you signed up for the BetterU AI waitlist.</p>
            <p>If you'd like to unsubscribe, please <a href="https://betteruai.com/unsubscribe?email=${email}" style="color: #2563eb;">click here</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
