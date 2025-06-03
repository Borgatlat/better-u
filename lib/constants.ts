export const NAVIGATION = [
  {
    title: "Facial Enhancement",
    href: "/facial-enhancement",
  },
  {
    title: "Gym & Fitness",
    href: "/gym-fitness",
  },
  {
    title: "Mental Wellness",
    href: "/mental-wellness",
  },
  {
    title: "Smart Shop",
    href: "/smart-shop",
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
    title: "Facial Enhancement",
    href: "/facial-enhancement",
    description: "AI-powered skincare, grooming, and facial harmony optimization",
    features: [
      { title: "Skincare Analysis", description: "Get personalized skincare routines based on your skin type" },
      { title: "Grooming Guide", description: "Expert advice for hair, beard, and eyebrow maintenance" },
      { title: "Facial Harmony", description: "Analysis and recommendations for balanced facial features" },
      { title: "Progress Tracking", description: "Track your skincare and grooming journey over time" },
    ],
  },
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
  {
    title: "Smart Shop",
    href: "/smart-shop",
    description: "Personalized product recommendations based on your needs",
    features: [
      { title: "Smart Recommendations", description: "AI-powered product suggestions for your specific needs" },
      { title: "Product Education", description: "Learn about ingredients and product benefits" },
      { title: "Progress-Based Shopping", description: "Get recommendations based on your improvement journey" },
      { title: "Price Tracking", description: "Find the best deals on recommended products" },
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
