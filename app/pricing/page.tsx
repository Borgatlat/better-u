import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing - BetterU AI",
  description: "Choose the perfect plan for your AI-powered self-improvement journey.",
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic AI assistance",
    features: [
      "Basic AI coaching",
      "10 messages per day with AI trainer",
      "Community access",
      "Basic progress tracking",
      "Standard workouts",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "month",
    description: "Unlock the full BetterU AI experience",
    features: [
      "Audio-guided mental wellness sessions",
      "AI-powered custom workouts",
      "100 messages per day with AI trainer",
      "Create and join groups",
      "Premium workout library",
      "Custom calorie goals",
      "Custom water intake goals",
      "Advanced progress analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium Yearly",
    price: "$99.90",
    period: "year",
    originalPrice: "$119.88",
    savings: "Save $19.98",
    description: "Best value - 2 months free",
    features: [
      "Everything in Premium Monthly",
      "Audio-guided mental wellness sessions",
      "AI-powered custom workouts",
      "100 messages per day with AI trainer",
      "Create and join groups",
      "Premium workout library",
      "Custom calorie goals",
      "Custom water intake goals",
      "Advanced progress analytics",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="container max-w-screen-xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">Choose Your Plan</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Unlock premium AI coaching, custom workouts, and personalized wellness guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.popular
                  ? "bg-white/[0.06] border-2 border-[#00f2fe]/30 scale-[1.02]"
                  : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-[#00f2fe] text-black px-3 py-1 rounded-full text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              {plan.savings && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30">
                    {plan.savings}
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-lg font-medium text-white/80 mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-semibold text-white">{plan.price}</span>
                  <span className="text-white/40 ml-1">/{plan.period}</span>
                </div>
                {plan.originalPrice && <p className="text-sm text-white/30 line-through">{plan.originalPrice}/year</p>}
                <p className="text-white/40 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 p-0.5 rounded-full bg-[#00f2fe]/20">
                      <Check className="h-3 w-3 text-[#00f2fe]" />
                    </div>
                    <span className="text-white/60 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-full transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#00f2fe] hover:bg-[#00d4ff] text-black font-medium"
                    : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1]"
                }`}
              >
                <Link href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-white/40 text-sm mb-6">All premium plans include a 7-day free trial. Cancel anytime.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00f2fe]/60" />
              No setup fees
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00f2fe]/60" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00f2fe]/60" />
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
