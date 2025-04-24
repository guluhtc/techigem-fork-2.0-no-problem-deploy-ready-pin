"use client"

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Download, Video, Film, Ghost, User } from 'lucide-react'

interface Tool {
  icon: React.ElementType
  label: string
  path: string
  gradient: string
}

const tools: Tool[] = [
  {
    icon: Download,
    label: "Photos",
    path: "/instagram/photo",
    gradient: "from-[#405DE6] via-[#5B51D8] to-[#833AB4]"
  },
  {
    icon: Video,
    label: "Videos",
    path: "/instagram/video",
    gradient: "from-[#833AB4] via-[#C13584] to-[#E1306C]"
  },
  {
    icon: Film,
    label: "Reels",
    path: "/instagram/reel",
    gradient: "from-[#E1306C] via-[#F77737] to-[#FCAF45]"
  },
  {
    icon: Ghost,
    label: "Stories",
    path: "/instagram/story",
    gradient: "from-[#FCAF45] via-[#F77737] to-[#FD1D1D]"
  },
  {
    icon: User,
    label: "Profile",
    path: "/instagram/profile",
    gradient: "from-[#FD1D1D] via-[#E1306C] to-[#C13584]"
  }
]

export function DownloaderToggle() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-30 mx-auto px-4 sm:px-0 w-full max-w-[720px]"
    >
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg rounded-full border shadow-lg p-1.5 overflow-x-auto scrollbar-hide">
        {tools.map((tool) => {
          const isActive = pathname ? pathname.includes(tool.path) : false
          return (
            <motion.button
              key={tool.path}
              onClick={() => router.push(tool.path)}
              className={`
                flex-1 relative group rounded-full transition-all duration-300 min-w-[100px]
                ${isActive ? 'bg-white shadow-sm scale-[1.02]' : 'hover:bg-white/50'}
              `}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-2 py-2.5 px-2">
                <div 
                  className={`
                    p-1.5 rounded-full bg-gradient-to-r ${tool.gradient}
                    ${isActive ? 'opacity-100' : 'opacity-80'}
                    group-hover:opacity-100 transition-opacity duration-300
                  `}
                >
                  <tool.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium truncate">{tool.label}</span>
              </div>
              <div 
                className={`
                  absolute inset-0 bg-gradient-to-r ${tool.gradient} 
                  opacity-0 group-hover:opacity-10 rounded-full 
                  transition-opacity duration-300
                `} 
              />
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}