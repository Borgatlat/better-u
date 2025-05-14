import { NextResponse } from "next/server"
import { redis } from "@/app/lib/redis"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      )
    }

    // Check if email exists in waitlist
    const isMember = await redis.sismember("waitlist_emails", email)

    if (!isMember) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found in our mailing list",
        },
        { status: 404 },
      )
    }

    // Remove email from waitlist
    await redis.srem("waitlist_emails", email)

    // Optionally, keep track of unsubscribes
    await redis.sadd("unsubscribed_emails", email)

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed",
    })
  } catch (error) {
    console.error("Error unsubscribing:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}
