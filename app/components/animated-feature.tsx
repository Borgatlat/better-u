"use client"

import { motion } from "framer-motion"

interface AnimatedFeatureProps {
  title: string
  description: string
  index: number
}

export function AnimatedFeature({ title, description, index }: AnimatedFeatureProps) {
  return (
    <motion.li
      className="flex items-start gap-4 text-left"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
      }}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 },
      }}
    >
      <div className="bg-[#00f2fe]/10 p-1.5 rounded-lg mt-1">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#00f2fe]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
          }}
        />
      </div>
      <div>
        <h3 className="font-semibold">
          <span className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">{title}</span>
        </h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.li>
  )
}
