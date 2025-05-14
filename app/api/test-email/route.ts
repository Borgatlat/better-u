import { NextResponse } from "next/server"
import { Resend } from "resend"
import EmailTemplate from "@/app/components/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  try {
    // Get the test email from the query string
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
    }

    // Generate the HTML email content
    const htmlContent = EmailTemplate({
      email,
      subject: "Test Email from BetterU AI",
      previewText: "This is a test email to verify that our email system is working",
      content:
        "This is a test email sent from the BetterU AI system to verify that our email sending functionality is working correctly.\n\nIf you received this email, it means our system is configured properly and can send emails successfully.",
      unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://betteruai.com"}/unsubscribe?token=${Buffer.from(email).toString("base64")}`,
    })

    // Send the test email
    const result = await resend.emails.send({
      from: "BetterU AI <hello@betteruai.com>",
      to: email,
      subject: "Test Email from BetterU AI",
      html: htmlContent,
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
