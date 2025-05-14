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

    console.log(`Found ${emails.length} emails in waitlist`)

    const totalEmails = emails.length
    let successCount = 0
    const failedEmails: string[] = []

    // Process emails in batches to avoid rate limits
    const batchSize = 10
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize)
      console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(emails.length / batchSize)}`)

      // Process each email in the batch
      const promises = batch.map(async (email) => {
        try {
          console.log(`Sending email to: ${email}`)

          // Create a unique unsubscribe token for this email
          const unsubscribeToken = Buffer.from(email).toString("base64")
          const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://betteruai.com"}/unsubscribe?token=${unsubscribeToken}`

          // Generate the HTML email content
          const htmlContent = EmailTemplate({
            email,
            subject,
            previewText: previewText || subject,
            content,
            unsubscribeUrl,
          })

          const result = await resend.emails.send({
            from: "BetterU AI <hello@betteruai.com>",
            to: email,
            subject: subject,
            html: htmlContent,
          })

          console.log(`Email sent to ${email}, result:`, result)

          successCount++
          return { success: true, email, result }
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error)
          failedEmails.push(email)
          return { success: false, email, error }
        }
      })

      const results = await Promise.all(promises)
      console.log(`Batch results:`, results)

      // Add a small delay between batches to avoid rate limits
      if (i + batchSize < emails.length) {
        console.log(`Waiting 1 second before next batch...`)
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
