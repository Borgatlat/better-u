"use server"

import { redis } from "../lib/redis"

export async function exportWaitlistEmails() {
  try {
    // Get all emails from the waitlist
    const emails = await redis.smembers("waitlist_emails")

    // Return the emails array
    return {
      success: true,
      emails,
      count: emails.length,
    }
  } catch (error) {
    console.error("Error exporting waitlist emails:", error)
    return {
      success: false,
      message: "Failed to export emails",
      emails: [],
      count: 0,
    }
  }
}
