"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  gradient?: boolean
  delay?: number
  once?: boolean
  highlightWords?: number[]
}

export function AnimatedText({
  text,
  className,
  gradient = false,
  delay = 0,
  once = true,
  highlightWords = [],
}: AnimatedTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * 0.1 },
    }),
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={cn(
            "inline-block mr-1",
            (gradient && highlightWords.includes(index)) || (gradient && highlightWords.length === 0 && index % 3 === 0)
              ? "bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent"
              : "",
          )}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
