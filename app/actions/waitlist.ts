"use server"

import { z } from "zod"
import { Resend } from "resend"
import EmailTemplate from "../components/email-template"
import { redis } from "../lib/redis"

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
})

export async function joinWaitlist(prevState: any, formData: FormData) {
  try {
    // Check if formData exists
    if (!formData) {
      return {
        success: false,
        message: "No form data provided",
      }
    }

    const email = formData.get("email")

    // Check if email exists
    if (!email || typeof email !== "string") {
      return {
        success: false,
        message: "Email is required",
      }
    }

    // Validate email before proceeding
    const result = schema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        message: result.error.errors[0].message || "Invalid email format",
      }
    }

    // Store validated email in Upstash Redis
    await redis.sadd("waitlist_emails", email)

    try {
      const resend = new Resend("re_7NxY8nKv_M9GwNDu72TG3dDiUqmUeA7ip")

      // Send welcome email using Resend
      const { data, error } = await resend.emails.send({
        from: "BetterU AI <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to BetterU AI Waitlist!",
        html: EmailTemplate({ email }),
      })

      if (error) {
        console.error("Error sending email:", error)
        // Continue even if email fails
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Continue even if email fails
    }

    const count = await getWaitlistCount()

    return {
      success: true,
      message: "You have been added to the waitlist!",
      count,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

// Make sure we're returning the actual count without modification
export async function getWaitlistCount() {
  try {
    const count = await redis.scard("waitlist_emails")
    return count
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return 0
  }
}
