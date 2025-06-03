import { LoginForm } from "@/app/components/auth/login-form"
import { BetterULogo } from "@/app/components/betteru-logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <BetterULogo className="h-12 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your self-improvement journey</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
