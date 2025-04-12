"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
}

export function ScrollAnimation({ children, className }: ScrollAnimationProps) {
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const { scrollY } = useScroll()

  // Calculate the scale based on scroll position
  const scale = useTransform(scrollY, [elementTop - clientHeight, elementTop + 100], [0.8, 1])

  // Calculate the opacity based on scroll position
  const opacity = useTransform(scrollY, [elementTop - clientHeight, elementTop - clientHeight * 0.5], [0, 1])

  useEffect(() => {
    const element = document.getElementById("scroll-container")

    // Get the element's position and the client height
    const onResize = () => {
      if (element) {
        setElementTop(element.offsetTop)
        setClientHeight(window.innerHeight)
      }
    }

    onResize()
    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <motion.div className={className} style={{ scale, opacity }}>
      {children}
    </motion.div>
  )
}
