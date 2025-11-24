"use client"

import { useState, useEffect } from "react"
import { getWaitlistCount } from "../actions/waitlist"
import { Avatar } from "./avatar"
import { WaitlistForm } from "./waitlist-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Brain, Trophy, Smile, Utensils, Radiation as Meditation } from "lucide-react"

export function WaitlistSignup() {
  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    getWaitlistCount().then((count) => setWaitlistCount(count))
  }, [])

  const handleSuccess = (count: number) => {
    setWaitlistCount(count)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-green-100">
            BetterU AI
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-300">
            Your personal AI companion for complete self-improvement
          </p>
        </div>

        <div className="w-full mb-12">
          <WaitlistForm onSuccess={handleSuccess} />
        </div>

        <Tabs defaultValue="gym" className="w-full">
          <TabsList className="grid grid-cols-2 gap-4 bg-black/20 p-2 rounded-xl">
            <TabsTrigger value="gym" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Gym & Fitness</span>
              <span className="sm:hidden">Gym</span>
            </TabsTrigger>
            <TabsTrigger value="mental" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Mental Wellness</span>
              <span className="sm:hidden">Mental</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gym" className="mt-4">
            <Card className="bg-black/20 border-0">
              <CardContent className="grid sm:grid-cols-2 gap-4 p-4">
                <div className="flex items-start gap-3 text-left">
                  <Trophy className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Workout Tracking</h3>
                    <p className="text-sm text-gray-400">Custom workouts, PR tracking, and progress monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <Utensils className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Nutrition Planning</h3>
                    <p className="text-sm text-gray-400">Meal prep, calorie tracking, and dietary guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mental" className="mt-4">
            <Card className="bg-black/20 border-0">
              <CardContent className="grid sm:grid-cols-2 gap-4 p-4">
                <div className="flex items-start gap-3 text-left">
                  <Meditation className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Mindfulness</h3>
                    <p className="text-sm text-gray-400">Guided meditation and journaling practices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <Smile className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">AI Therapy</h3>
                    <p className="text-sm text-gray-400">24/7 emotional support and mental wellness tracking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-center mt-8">
          <div className="flex -space-x-2 mr-4">
            <Avatar initials="JD" index={0} />
            <Avatar initials="AS" index={1} />
            <Avatar initials="MK" index={2} />
          </div>
          <p className="text-white font-semibold">{waitlistCount} people on the waitlist</p>
        </div>
      </div>
    </div>
  )
}
