import { createClient } from "./lib/supabase/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Only apply auth middleware to protected routes
  const protectedPaths = ["/dashboard", "/settings", "/admin"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  try {
    const response = NextResponse.next()
    const supabase = createClient(request, response)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL("/login", request.url))
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
