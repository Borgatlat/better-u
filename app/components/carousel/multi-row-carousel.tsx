"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CarouselRow } from "./carousel-row"

// Define the carousel data
const fitnessItems = [
  {
    id: "fitness-1",
    title: "AI-Powered Workout Plans",
    description: "Personalized exercise routines tailored to your goals and fitness level",
    category: "Fitness",
  },
  {
    id: "fitness-2",
    title: "Real-time Form Analysis",
    description: "Get instant feedback on your exercise technique to maximize results",
    category: "Fitness",
  },
  {
    id: "fitness-3",
    title: "Progress Tracking",
    description: "Visualize your improvements with detailed analytics and insights",
    category: "Fitness",
  },
  {
    id: "fitness-4",
    title: "Nutrition Planning",
    description: "Custom meal plans that complement your workout routine",
    category: "Fitness",
  },
]

const mentalWellnessItems = [
  {
    id: "mental-1",
    title: "AI Therapy Sessions",
    description: "24/7 emotional support and guided conversations for mental wellness",
    category: "Mental Wellness",
  },
  {
    id: "mental-2",
    title: "Meditation Guide",
    description: "Personalized meditation practices based on your emotional state",
    category: "Mental Wellness",
  },
  {
    id: "mental-3",
    title: "Mood Tracking",
    description: "Monitor your emotional well-being with advanced pattern recognition",
    category: "Mental Wellness",
  },
  {
    id: "mental-4",
    title: "Journal Analytics",
    description: "AI-powered insights from your personal journal entries",
    category: "Mental Wellness",
  },
]

const appearanceItems = [
  {
    id: "appearance-1",
    title: "Skincare Analysis",
    description: "AI-powered skin assessment and personalized care recommendations",
    category: "Appearance",
  },
  {
    id: "appearance-2",
    title: "Grooming Guide",
    description: "Expert advice for hair, beard, and eyebrow maintenance",
    category: "Appearance",
  },
  {
    id: "appearance-3",
    title: "Style Recommendations",
    description: "Personalized fashion advice based on your body type and preferences",
    category: "Appearance",
  },
  {
    id: "appearance-4",
    title: "Facial Harmony",
    description: "Analysis and recommendations for balanced facial features",
    category: "Appearance",
  },
]

export function MultiRowCarousel() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-16 overflow-hidden bg-gradient-to-b from-black to-[#001a1a]/30 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            Discover BetterU AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered self-improvement tools
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Fitness Row - Moving Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Fitness & Training</h3>
            <CarouselRow items={fitnessItems} direction="left" speed={30} />
          </motion.div>

          {/* Mental Wellness Row - Moving Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Mental Wellness</h3>
            <CarouselRow items={mentalWellnessItems} direction="right" speed={25} />
          </motion.div>

          {/* Appearance Row - Moving Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">Appearance Enhancement</h3>
            <CarouselRow items={appearanceItems} direction="left" speed={20} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
