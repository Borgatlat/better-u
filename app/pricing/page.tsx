import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing - BetterUAI",
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
    name: "Premium Monthly",
    price: "$9.99",
    period: "month",
    description: "Unlock the full BetterUAI experience",
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
    description: "Best value - 2 months free!",
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
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#00f2fe] to-[#0ea5e9] bg-clip-text text-transparent">
              Transformation
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock premium AI coaching, custom workouts, and personalized wellness guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative bg-white/5 border-white/10 ${plan.popular ? "ring-2 ring-[#00f2fe] scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#00f2fe] text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.savings && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {plan.savings}
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mt-1">{plan.originalPrice}/year</div>
                  )}
                </div>
                <CardDescription className="text-gray-400 mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-[#00f2fe] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-[#00f2fe] hover:bg-[#00b4ff] text-black"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">All premium plans include a 7-day free trial. Cancel anytime.</p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Questions? Contact us at{" "}
            <a href="mailto:hello@betteruai.com" className="text-[#00f2fe] hover:underline">
              hello@betteruai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
