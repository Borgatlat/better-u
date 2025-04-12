"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function DramaticDivider() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className="w-full h-40 relative overflow-hidden my-12 bg-gradient-to-b from-black via-blue-950/20 to-black"
    >
      {/* Main horizontal glowing line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[6px] -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Base line */}
        <div className="absolute inset-0 bg-[#00f2fe]/30" />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 via-[#00b4ff] to-[#00f2fe]"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 blur-[15px] bg-[#00f2fe] opacity-70" />
      </motion.div>

      {/* Pulsing center orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-[#00f2fe] flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px 5px rgba(0, 242, 254, 0.7)",
              "0 0 40px 10px rgba(0, 242, 254, 0.7)",
              "0 0 20px 5px rgba(0, 242, 254, 0.7)",
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-white"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Radiating circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00f2fe]/30"
          initial={{ width: 20, height: 20, opacity: 0 }}
          animate={{
            width: inView ? [20 + i * 40, 200 + i * 100] : 0,
            height: inView ? [20 + i * 40, 200 + i * 100] : 0,
            opacity: inView ? [0.8, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Light rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 origin-center h-[1px] bg-gradient-to-r from-[#00f2fe] to-transparent"
          style={{
            rotate: `${i * 45}deg`,
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: inView ? ["0%", "100%"] : "0%",
            opacity: inView ? [0, 0.7, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
