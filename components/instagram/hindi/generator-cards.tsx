"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { PenSquare, UserCircle, Hash } from "lucide-react"
import { useRouter } from "next/navigation"

const generators = [
  {
    icon: PenSquare,
    title: "कैप्शन जनरेटर",
    description: "अपनी ऑडियंस के लिए आकर्षक कैप्शन बनाएं",
    path: "/instagram/captions/hindi",
    gradient: "from-[#833AB4]/20 to-[#F77737]/20",
    iconGradient: "from-[#833AB4] to-[#F77737]"
  },
  {
    icon: UserCircle,
    title: "बायो जनरेटर",
    description: "प्रोफेशनल और आकर्षक इंस्टाग्राम बायो बनाएं",
    path: "/instagram/bios/hindi",
    gradient: "from-[#F77737]/20 to-[#FCAF45]/20",
    iconGradient: "from-[#F77737] to-[#FCAF45]"
  },
  {
    icon: Hash,
    title: "हैशटैग जनरेटर",
    description: "अपनी पोस्ट के लिए ट्रेंडिंग हैशटैग खोजें",
    path: "/instagram/hashtags/hindi",
    gradient: "from-[#FCAF45]/20 to-[#833AB4]/20",
    iconGradient: "from-[#FCAF45] to-[#833AB4]"
  }
]

export function GeneratorCards() {
  const router = useRouter()

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {generators.map((generator, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            className="p-6 space-y-4 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => router.push(generator.path)}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${generator.gradient} rounded-full blur-xl`} />
              <div className={`relative p-3 w-12 h-12 rounded-xl bg-gradient-to-br ${generator.iconGradient} flex items-center justify-center`}>
                <generator.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">{generator.title}</h3>
            <p className="text-muted-foreground">
              {generator.description}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}