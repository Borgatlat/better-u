"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/components/auth/auth-provider"
import { authClient } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Brain, Users, ShoppingBag, Sparkles } from "lucide-react"

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
      // Fetch user profile
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
      status: "Coming Soon",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Mindfulness and cognitive enhancement tools",
      status: "Coming Soon",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded individuals",
      status: "Coming Soon",
    },
    {
      icon: ShoppingBag,
      title: "Smart Shopping",
      description: "AI-curated product recommendations",
      status: "Coming Soon",
    },
  ]

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {displayName}!</h1>
          <p className="text-gray-400 text-lg">Your AI-powered self-improvement journey continues here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-400/20 rounded-lg">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                      <span className="text-xs text-cyan-400 font-medium">{feature.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border-cyan-400/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-cyan-400" />
              <div>
                <CardTitle className="text-white text-2xl">Get Early Access</CardTitle>
                <CardDescription className="text-gray-300">
                  Join our TestFlight beta to experience BetterU AI on iOS
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => window.open("https://testflight.apple.com/join/9TQrDfBx", "_blank")}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold"
            >
              Join iOS Beta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
