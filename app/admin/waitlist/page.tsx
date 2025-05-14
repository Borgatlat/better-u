import { redis } from "@/app/lib/redis"
import { EmailList } from "./client"

export const dynamic = "force-dynamic"

export default async function WaitlistAdmin() {
  // Fetch all emails from Redis
  const emails = await redis.smembers("waitlist_emails")
  const totalCount = emails.length

  return <EmailList emails={emails} totalCount={totalCount} />
}
