import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// In a real app, you would use a secure environment variable
const ADMIN_PASSWORD = "betteruadmin2024"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === ADMIN_PASSWORD) {
    // Set a cookie to indicate the user is authenticated
    cookies().set("admin_authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 })
}
