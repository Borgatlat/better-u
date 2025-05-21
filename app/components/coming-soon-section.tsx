"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { WaitlistForm } from "./waitlist-form"
import { Sparkles, AppleIcon } from "lucide-react"
import { TestFlightButton } from "./testflight-button"

export function ComingSoonSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001a1a]/30 to-black" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00f2fe] rounded-full filter blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00f2fe] rounded-full filter blur-[120px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-[#00f2fe]/10 p-3 rounded-lg">
              <Sparkles className="w-8 h-8 text-[#00f2fe]" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We're working hard to bring you the ultimate AI-powered self-improvement experience. Join our waitlist to be
            among the first to access BetterU AI when we launch.
          </p>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-xl blur-lg opacity-30" />
              <div className="relative bg-black/60 backdrop-blur-xl p-1 rounded-xl border border-white/10">
                <WaitlistForm />
              </div>
            </div>
          </div>

          {/* TestFlight Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <AppleIcon className="h-5 w-5 text-[#00f2fe]" />
              <p className="text-lg text-white font-medium">iOS Beta Available Now</p>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4">
              Want to try BetterU AI right now? Our iOS beta is available on TestFlight. Get early access and help shape
              the future of the app.
            </p>
            <TestFlightButton
              variant="default"
              className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black hover:text-white"
              text="Download iOS Beta"
            />
          </motion.div>
        </motion.div>

        {/* Feature preview cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              title: "Personalized AI Coaching",
              description: "Get tailored guidance based on your unique goals and preferences",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M17.5 6.51L17.51 6.49889"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              title: "Progress Tracking",
              description: "Monitor your improvement journey with detailed analytics and insights",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              title: "Community Support",
              description: "Connect with others on similar self-improvement journeys",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#00f2fe]/30 transition-all group"
            >
              <div className="bg-[#00f2fe]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-[#00f2fe] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
