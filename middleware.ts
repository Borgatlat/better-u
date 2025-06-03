import { updateSession } from "./lib/supabase/middleware"

export async function middleware(request: any) {
  // Only apply auth middleware to protected routes
  const protectedPaths = ["/dashboard", "/settings", "/admin"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    return await updateSession(request)
  }

  // For all other routes, just continue without auth check
  return
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
