"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { BetterULogo } from "./betteru-logo"

interface AnimatedLogoProps {
  minSize?: number
  maxSize?: number
  className?: string
}

export function AnimatedLogo({ minSize = 140, maxSize = 200, className = "" }: AnimatedLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [animationCount, setAnimationCount] = useState(0)

  // Scroll-based animations - only for size
  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ["start end", "end start"],
  })

  const size = useTransform(scrollYProgress, [0, 0.5, 1], [minSize, maxSize, minSize])

  // Particle system - only visible on hover
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number; color: string }>
  >([])

  // Generate particles
  useEffect(() => {
    const particleCount = 16
    const newParticles = []

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const distance = Math.random() * 40 + 100

      newParticles.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 1 + 0.5,
        color: i % 3 === 0 ? "#00AAFF" : i % 3 === 1 ? "#00f2fe" : "#0088cc",
      })
    }

    setParticles(newParticles)
  }, [])

  // Handle hover animations
  useEffect(() => {
    if (isHovered && animationCount < 2) {
      setHasAnimated(true)
      setAnimationCount((prev) => prev + 1)

      // Start the animation sequence
      controls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: 1,
          repeatType: "reverse",
        },
      })
    }
  }, [isHovered, controls, animationCount])

  // Reset animation count when not hovered
  useEffect(() => {
    if (!isHovered && hasAnimated) {
      // Reset after a delay to prevent immediate re-triggering
      const timeout = setTimeout(() => {
        setAnimationCount(0)
        setHasAnimated(false)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [isHovered, hasAnimated])

  return (
    <motion.div
      ref={logoRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D rotation container */}
      <motion.div
        className="w-full h-full relative"
        animate={
          isHovered && animationCount < 2
            ? {
                rotateY: [0, 10, -10, 0],
                rotateX: [0, -5, 5, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: 1,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Particles - only visible on hover */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              filter: "blur(1px)",
              x: particle.x,
              y: particle.y,
              opacity: 0,
              zIndex: 1,
            }}
            animate={
              isHovered && animationCount < 2
                ? {
                    x: [
                      particle.x,
                      particle.x + Math.cos(particle.id) * 30,
                      particle.x - Math.cos(particle.id) * 30,
                      particle.x,
                    ],
                    y: [
                      particle.y,
                      particle.y + Math.sin(particle.id) * 30,
                      particle.y - Math.sin(particle.id) * 30,
                      particle.y,
                    ],
                    opacity: [0, 0.8, 0.8, 0],
                    scale: [0.5, 1.5, 1.5, 0.5],
                  }
                : {}
            }
            transition={{
              duration: particle.speed * 4,
              repeat: 1,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer glow rings - only visible on hover */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: "100%",
              height: "100%",
              border: `${i + 1}px solid #00AAFF`,
              filter: `blur(${(i + 1) * 3}px)`,
              opacity: 0,
              zIndex: 0,
            }}
            animate={
              isHovered && animationCount < 2
                ? {
                    scale: [1, 1.1 + i * 0.1, 1],
                    opacity: [0, 0.3 - i * 0.05, 0],
                  }
                : {}
            }
            transition={{
              duration: 2 + i * 0.5,
              repeat: 1,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Inner glow - only visible on hover */}
        <motion.div
          className="absolute rounded-full bg-[#00AAFF]"
          style={{
            width: "80%",
            height: "80%",
            filter: "blur(30px)",
            opacity: 0,
            zIndex: 0,
          }}
          animate={
            isHovered && animationCount < 2
              ? {
                  opacity: [0, 0.15, 0],
                  scale: [0.9, 1.05, 0.9],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: 1,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Logo with hover effect */}
        <motion.div
          animate={
            isHovered
              ? {
                  rotateZ: [0, -3, 3, 0],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: isHovered && animationCount < 2 ? 1 : 0,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 2,
            position: "relative",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BetterULogo width="100%" height="100%" />

          {/* Highlight overlay for 3D effect - only visible on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-full"
            style={{ opacity: 0, zIndex: 3 }}
            animate={
              isHovered && animationCount < 2
                ? {
                    opacity: [0, 0.15, 0],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: 1,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Radial lines - only visible on hover */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-[#00AAFF] to-transparent"
            style={{
              width: "40%",
              height: "1px",
              left: "50%",
              top: "50%",
              transformOrigin: "left center",
              transform: `rotate(${i * 30}deg)`,
              opacity: 0,
              zIndex: 0,
            }}
            animate={
              isHovered && animationCount < 2
                ? {
                    opacity: [0, 0.3, 0],
                    width: ["40%", "60%", "40%"],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: 1,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}

        {/* Orbiting dots - only visible on hover */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute rounded-full bg-[#00f2fe]"
            style={{
              width: 6 - i,
              height: 6 - i,
              top: "50%",
              left: "50%",
              marginTop: -3 + i * 0.5,
              marginLeft: -3 + i * 0.5,
              opacity: 0,
              zIndex: 4,
            }}
            animate={
              isHovered && animationCount < 2
                ? {
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 4 - i,
              repeat: 1,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute bg-[#00f2fe] rounded-full"
              style={{
                width: 6 - i,
                height: 6 - i,
                left: 80 + i * 15,
                top: 0,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pulse effect that appears on hover */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "100%",
          height: "100%",
          border: "2px solid #00AAFF",
          opacity: 0,
          zIndex: 5,
        }}
        animate={
          isHovered && animationCount < 2
            ? {
                opacity: [0, 0.5, 0],
                scale: [1, 1.5, 1],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: 1,
          repeatType: "mirror",
        }}
      />
    </motion.div>
  )
}
