"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useInView } from "react-intersection-observer"

function Model(props: any) {
  const group = useRef<any>()
  const { nodes, materials } = useGLTF("/scene.glb") as any
  return (
    <group ref={group} {...props} dispose={null} scale={0.5}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[0, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.palette} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/scene.glb")

export default function Hero3D() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <section ref={ref} className="relative flex items-center justify-center h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900 to-purple-700 opacity-70 z-0"></div>

      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Your AI Companion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Your personal AI companion for complete self-improvement.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full"
        >
          Get Started
        </motion.button>
      </div>

      <div className="absolute bottom-0 w-full h-1/2 md:h-2/3 lg:h-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 2, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
      </div>
    </section>
  )
}
