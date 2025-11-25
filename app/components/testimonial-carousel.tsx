"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "BetterU AI has completely transformed my approach to fitness. The personalized workout plans have helped me achieve results I never thought possible.",
    author: "Michael K.",
    role: "Fitness Enthusiast",
  },
  {
    quote:
      "The mental wellness features have been a game-changer for my daily mindfulness practice. I feel more centered and focused than ever before.",
    author: "Sarah L.",
    role: "Yoga Instructor",
  },
  {
    quote:
      "The AI-powered guidance and personalized recommendations have helped me make better decisions about my wellness journey.",
    author: "James T.",
    role: "Marketing Professional",
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f2fe]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">What Our Users Say</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          <div className="relative h-[280px] overflow-hidden">
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
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="text-center px-8">
                  <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
                    "{testimonials[current].quote}"
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/50 text-sm font-medium mb-3">
                      {testimonials[current].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <p className="font-medium text-white">{testimonials[current].author}</p>
                    <p className="text-sm text-white/40">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Refined navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1)
                    setCurrent(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === current ? "bg-[#00f2fe] w-6" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
