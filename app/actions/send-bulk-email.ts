"use server"

import { Resend } from "resend"
import { redis } from "../lib/redis"
import EmailTemplate from "../components/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBulkEmail(formData: FormData) {
  try {
    // Get all emails from the waitlist
    const emails = await redis.smembers("waitlist_emails")

    if (!emails.length) {
      return {
        success: false,
        message: "No emails found in the waitlist",
      }
    }

    const subject = formData.get("subject") as string
    const previewText = formData.get("previewText") as string
    const content = formData.get("content") as string

    if (!subject || !content) {
      return {
        success: false,
        message: "Subject and content are required",
      }
    }

    // For tracking purposes
    let successCount = 0
    const failedEmails: string[] = []

    // Send emails in batches of 10 to avoid rate limits
    const batchSize = 10
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize)

      // Process each email in the current batch
      const promises = batch.map(async (email) => {
        try {
          await resend.emails.send({
            from: "BetterU AI <hello@betteruai.com>",
            to: email,
            subject: subject,
            react: EmailTemplate({
              email,
              subject,
              previewText,
              content,
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
      message: `Successfully sent emails to ${successCount} recipients. Failed: ${failedEmails.length}`,
      totalEmails: emails.length,
      successCount,
      failedEmails,
    }
  } catch (error) {
    console.error("Error sending bulk emails:", error)
    return {
      success: false,
      message: "Failed to send emails",
      error: (error as Error).message,
    }
  }
}
