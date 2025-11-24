export const NAVIGATION = [
  {
    title: "Gym & Fitness",
    href: "/gym-fitness",
  },
  {
    title: "Mental Wellness",
    href: "/mental-wellness",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Login",
    href: "/login",
  },
  {
    title: "Sign Up",
    href: "/signup",
  },
] as const

// Separate features data for the FeatureShowcase component
export const FEATURE_SHOWCASE = [
  {
    title: "Gym & Fitness",
    href: "/gym-fitness",
    description: "Personalized workout plans, nutrition tracking, and fitness goals",
    features: [
      { title: "Custom Workouts", description: "AI-generated workout plans tailored to your goals" },
      { title: "Progress Tracking", description: "Track weights, PRs, and body measurements" },
      { title: "Nutrition Planning", description: "Personalized meal plans and calorie tracking" },
      { title: "Challenge System", description: "Join community challenges and track achievements" },
    ],
  },
  {
    title: "Mental Wellness",
    href: "/mental-wellness",
    description: "AI therapy, meditation guidance, and emotional support",
    features: [
      { title: "AI Therapy", description: "24/7 emotional support and guided conversations" },
      { title: "Meditation Guide", description: "Personalized meditation and mindfulness practices" },
      { title: "Journal Analytics", description: "AI-powered insights from your journal entries" },
      { title: "Mood Tracking", description: "Track and analyze your emotional well-being" },
    ],
  },
]

export const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://x.com/betteruai",
    icon: "x",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/betteruai",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/betteruai",
    icon: "linkedin",
  },
  {
    name: "Discord",
    href: "https://discord.gg/betteruai",
    icon: "discord",
  },
] as const

export const COMPANY_INFO = {
  name: "BetterUAI",
  description: "Your personal AI companion for complete self-improvement across all aspects of your life.",
  email: "hello@betteruai.com",
  address: "San Francisco, CA",
} as const
