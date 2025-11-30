export const NAVIGATION = [
  {
    title: "Gym & Fitness",
    href: "/features/fitness",
  },
  {
    title: "Mental Wellness",
    href: "/features/mental-wellness",
  },
  {
    title: "Community",
    href: "/features/community",
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
    href: "/features/fitness",
    description: "Personalized workout plans, progress tracking, and fitness goals",
    image: "/images/fitness-app.png",
    features: [
      { title: "Custom Workouts", description: "AI-generated workout plans tailored to your goals" },
      { title: "Progress Tracking", description: "Track weights, PRs, and body measurements" },
      { title: "Shared Workouts", description: "Share and discover workouts from the community" },
      { title: "Personal Records", description: "Track and celebrate your fitness milestones" },
    ],
  },
  {
    title: "Mental Wellness",
    href: "/features/mental-wellness",
    description: "Meditation, mood tracking, and emotional well-being support",
    image: "/images/mental-app.png",
    features: [
      { title: "Breathing Exercises", description: "Guided breathing techniques to calm your mind" },
      { title: "Meditation", description: "Find peace with guided meditation sessions" },
      { title: "Stress Relief", description: "Quick exercises to reduce stress and anxiety" },
      { title: "Mood Tracking", description: "Track and analyze your emotional well-being" },
    ],
  },
  {
    title: "Community",
    href: "/features/community",
    description: "Connect with others, share progress, and stay motivated",
    image: "/images/community-app.png",
    features: [
      { title: "Social Feed", description: "Share achievements and motivate each other" },
      { title: "Challenges", description: "Join community challenges and compete" },
      { title: "Leagues", description: "Compete in fitness leagues with friends" },
      { title: "Support Groups", description: "Connect with like-minded individuals" },
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
  name: "BetterU",
  description: "Your personal AI companion for complete self-improvement across all aspects of your life.",
  email: "hello@betteru.app",
  address: "San Francisco, CA",
} as const
