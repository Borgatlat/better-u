"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CarouselCardProps {
  title: string
  description: string
  category: string
  isHovered: boolean
  index: number
}

export function CarouselCard({ title, description, category, isHovered, index }: CarouselCardProps) {
  // Generate a slightly different gradient based on the index for visual variety
  const getGradient = () => {
    const hues = [200, 190, 210, 185, 195]
    const baseHue = hues[index % hues.length]
    return `linear-gradient(135deg, hsl(${baseHue}, 100%, 15%) 0%, hsl(${baseHue + 10}, 100%, 5%) 100%)`
  }

  return (
    <motion.div
      className={cn(
        "flex-shrink-0 relative w-[280px] h-[220px] rounded-xl overflow-hidden mx-3 transition-all duration-300",
        isHovered ? "scale-105 shadow-xl shadow-[#00f2fe]/20 z-10" : "scale-100",
      )}
      animate={{
        y: isHovered ? -10 : 0,
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: getGradient(),
        border: "1px solid rgba(0, 242, 254, 0.2)",
      }}
    >
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col text-white">
        <span className="inline-block px-2 py-1 text-xs font-medium bg-[#00f2fe]/20 text-[#00f2fe] rounded-full mb-3 w-fit">
          {category}
        </span>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
      </div>

      {/* Hover effect overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-2 border-[#00f2fe]/50 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}
