"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Sample testimonials
const testimonials = [
  {
    quote:
      "BetterU AI has completely transformed my approach to fitness. The personalized workout plans and nutrition guidance have helped me achieve results I never thought possible.",
    author: "Michael K.",
    role: "Fitness Enthusiast",
    avatar: "/diverse-group-city.png",
  },
  {
    quote:
      "The mental wellness features have been a game-changer for my daily mindfulness practice. I feel more centered and focused than ever before.",
    author: "Sarah L.",
    role: "Yoga Instructor",
    avatar: "/contemplative-artist.png",
  },
  {
    quote:
      "The AI-powered guidance and personalized recommendations have helped me make better decisions about my wellness journey and see real improvements.",
    author: "James T.",
    role: "Marketing Professional",
    avatar: "/contemplative-man.png",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  // Auto-rotate testimonials
  useEffect(() => {
    if (!inView) return

    const nextSlide = () => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }

    timeoutRef.current = setTimeout(nextSlide, 6000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current, inView])

  const handlePrevious = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  // Variants for animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  }

  return (
    <div ref={ref} className="py-20 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how BetterU AI is transforming lives through personalized self-improvement
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial carousel */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 max-w-3xl relative">
                  <Quote className="absolute top-6 left-6 w-10 h-10 text-[#00f2fe]/20" />

                  <div className="text-center">
                    <p className="text-xl md:text-2xl text-gray-200 italic mb-8 relative z-10">
                      "{testimonials[current].quote}"
                    </p>

                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00f2fe]/30 mr-4">
                        <img
                          src={testimonials[current].avatar || "/placeholder.svg"}
                          alt={testimonials[current].author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white">{testimonials[current].author}</p>
                        <p className="text-[#00f2fe]">{testimonials[current].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-[#00f2fe]/20 hover:border-[#00f2fe]/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1)
                    setCurrent(idx)
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === current ? "bg-[#00f2fe]" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-[#00f2fe]/20 hover:border-[#00f2fe]/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
