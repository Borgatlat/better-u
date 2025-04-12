// Cookie utility functions for client-side usage

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const cookies = document.cookie.split("; ")
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=")
    if (cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

/**
 * Set a cookie with the given name, value, and expiration days
 */
export function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`
}

/**
 * Delete a cookie by setting its expiration to the past
 */
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`
}

/**
 * Check if a cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null
}

/**
 * Get all cookies as an object
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === "undefined") return {}

  const result: Record<string, string> = {}
  const cookies = document.cookie.split("; ")

  for (const cookie of cookies) {
    if (cookie) {
      const [name, value] = cookie.split("=")
      result[name] = decodeURIComponent(value)
    }
  }

  return result
}

// Add a function to generate a unique user ID
export function generateUserId(): string {
  return "user_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
