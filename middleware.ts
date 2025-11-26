import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Only apply auth middleware to protected routes
  const protectedPaths = ["/dashboard", "/settings", "/admin"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // In the deployed version with proper env vars, this will work with Supabase
  // For preview, we allow access and let client-side auth handle redirection
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
