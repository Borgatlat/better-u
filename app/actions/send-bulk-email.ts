"use server"

import { Resend } from "resend"
import { redis } from "@/app/lib/redis"
import EmailTemplate from "@/app/components/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBulkEmail(formData: FormData) {
  try {
    const subject = formData.get("subject") as string
    const previewText = formData.get("previewText") as string
    const content = formData.get("content") as string

    if (!subject || !content) {
      return {
        success: false,
        message: "Subject and content are required",
      }
    }

    // Get all emails from Redis
    const emails = await redis.smembers("waitlist_emails")

    if (!emails || emails.length === 0) {
      return {
        success: false,
        message: "No emails found in the waitlist",
      }
    }

    const totalEmails = emails.length
    let successCount = 0
    const failedEmails: string[] = []

    // Process emails in batches to avoid rate limits
    const batchSize = 10
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize)

      // Process each email in the batch
      const promises = batch.map(async (email) => {
        try {
          // Create a unique unsubscribe token for this email
          const unsubscribeToken = Buffer.from(email).toString("base64")
          const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://betteruai.com"}/unsubscribe?token=${unsubscribeToken}`

          await resend.emails.send({
            from: "BetterU AI <hello@betteruai.com>",
            to: email,
            subject: subject,
            react: EmailTemplate({
              previewText: previewText || subject,
              content: content,
              unsubscribeUrl: unsubscribeUrl,
            }),
          })

          successCount++
          return { success: true, email }
        } catch (error) {
          failedEmails.push(email)
          return { success: false, email, error }
        }
      })

      await Promise.all(promises)

      // Add a small delay between batches to avoid rate limits
      if (i + batchSize < emails.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    return {
      success: true,
      message: `Successfully sent emails to ${successCount} out of ${totalEmails} subscribers.`,
      totalEmails,
      successCount,
      failedEmails,
    }
  } catch (error) {
    console.error("Error sending bulk email:", error)
    return {
      success: false,
      message: "Failed to send emails",
      error: (error as Error).message,
    }
  }
}
