import { LoginForm } from "@/app/components/auth/login-form"
import { BetterULogo } from "@/app/components/betteru-logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00f2fe]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <BetterULogo width={40} height={40} />
            <span className="text-white font-semibold text-lg tracking-tight">BetterU</span>
          </Link>
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Welcome back</h1>
          <p className="text-sm text-white/40">Sign in to continue your journey</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
