"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { CarouselCard } from "./carousel-card"

interface CarouselItem {
  id: string
  title: string
  description: string
  category: string
}

interface CarouselRowProps {
  items: CarouselItem[]
  direction: "left" | "right"
  speed: number
}

export function CarouselRow({ items, direction, speed }: CarouselRowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  // Duplicate items to create seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items]

  useEffect(() => {
    let contentWidth = 0

    // Calculate the width of the content
    if (containerRef.current) {
      // Each card is approximately 280px + 6px margins
      contentWidth = items.length * 286
    }

    // Animation duration based on speed
    const duration = contentWidth / speed

    // Define animation
    const animate = async () => {
      // Reset position when needed
      await controls.set({ x: direction === "left" ? 0 : -contentWidth })

      // Animate the scroll
      await controls.start({
        x: direction === "left" ? -contentWidth : 0,
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      })
    }

    // Start animation if not paused
    if (!isPaused) {
      animate()
    } else {
      // Pause by stopping the animation
      controls.stop()
    }
  }, [controls, direction, isPaused, items.length, speed])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div className="flex" animate={controls}>
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CarouselCard
              title={item.title}
              description={item.description}
              category={item.category}
              isHovered={hoveredIndex === index}
              index={index}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
