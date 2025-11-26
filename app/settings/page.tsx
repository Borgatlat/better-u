"use client"

import { useAuth } from "@/app/components/auth/auth-provider"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { Smartphone, User, Shield } from "lucide-react"

export default function SettingsPage() {
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      redirect("/login")
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#00f2fe] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-white/40">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00f2fe]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-32 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Settings</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">Account Settings</h1>
          <p className="text-white/40">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <User className="h-5 w-5 text-white/60" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Profile Information</h2>
                <p className="text-sm text-white/40">Update your personal information</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-white/50">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  defaultValue={profile?.full_name || ""}
                  className="bg-white/[0.02] border-white/[0.06] text-white placeholder:text-white/25 focus:border-[#00f2fe]/40 focus:ring-1 focus:ring-[#00f2fe]/20 rounded-xl h-12 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white/50">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email || ""}
                  disabled
                  className="bg-white/[0.02] border-white/[0.06] text-white/50 rounded-xl h-12 cursor-not-allowed"
                />
              </div>
              <Button className="bg-white text-black hover:bg-white/90 font-medium rounded-xl h-11 px-6 text-sm tracking-wide transition-all duration-300">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Sync Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <Smartphone className="h-5 w-5 text-white/60" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Cross-Platform Sync</h2>
                <p className="text-sm text-white/40">Your account is synced across web and mobile apps</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <p className="text-sm font-medium text-white">Sync Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-sm text-emerald-400">Connected</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-transparent border-white/[0.08] text-white/70 hover:bg-white/[0.04] hover:text-white rounded-xl text-sm transition-all duration-300"
              >
                Manage Devices
              </Button>
            </div>
          </div>

          {/* Security Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <Shield className="h-5 w-5 text-white/60" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Security</h2>
                <p className="text-sm text-white/40">Manage your password and security settings</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <p className="text-sm font-medium text-white">Password</p>
                <p className="text-sm text-white/40 mt-0.5">Last changed 30 days ago</p>
              </div>
              <Button
                variant="outline"
                className="bg-transparent border-white/[0.08] text-white/70 hover:bg-white/[0.04] hover:text-white rounded-xl text-sm transition-all duration-300"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
