"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/components/auth/auth-provider"
import { authClient } from "@/lib/auth"
import { Dumbbell, Brain, Users, Sparkles } from "lucide-react"
import { AppStoreButton } from "@/app/components/app-store-button"

interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      authClient.getProfile().then((profileData) => {
        setProfile(profileData)
        setProfileLoading(false)
      })
    }
  }, [user, loading, router])

  const features = [
    {
      icon: Dumbbell,
      title: "Fitness & Training",
      description: "AI-powered workout plans and form correction",
      status: "Active",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Mindfulness and cognitive enhancement tools",
      status: "Active",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded individuals",
      status: "Active",
    },
  ]

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#00f2fe] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-white/40">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00f2fe]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-5xl mx-auto px-6 py-32 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
            Welcome back, {displayName}
          </h1>
          <p className="text-white/40">Your AI-powered self-improvement journey continues here.</p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <Icon className="h-5 w-5 text-white/60" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white">{feature.title}</h3>
                      <span className="text-[10px] font-medium text-[#00f2fe] bg-[#00f2fe]/10 px-2 py-0.5 rounded-full">
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-sm text-white/40">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Download CTA */}
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#00f2fe]/10">
                <Sparkles className="h-6 w-6 text-[#00f2fe]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Get the Mobile App</h2>
                <p className="text-white/40">
                  Download BetterU AI on iOS for the complete experience with all features.
                </p>
              </div>
            </div>
            <AppStoreButton variant="hero" text="Download on App Store" />
          </div>
        </div>
      </div>
    </div>
  )
}
