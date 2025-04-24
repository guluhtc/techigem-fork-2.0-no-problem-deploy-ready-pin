"use client"

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { PenSquare, UserCircle, Hash } from 'lucide-react'

interface Tool {
  icon: React.ElementType
  label: string
  path: string
  gradient: string
}

const tools: Tool[] = [
  {
    icon: PenSquare,
    label: "Captions",
    path: "/instagram/captions",
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
  },
  {
    icon: UserCircle,
    label: "Bios",
    path: "/instagram/bios",
    gradient: "from-[#F77737] via-[#FCAF45] to-[#833AB4]"
  },
  {
    icon: Hash,
    label: "Hashtags",
    path: "/instagram/hashtags",
    gradient: "from-[#FCAF45] via-[#833AB4] to-[#F77737]"
  }
]

export function ToolsToggle() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-30 mx-auto px-4 sm:px-0 w-full max-w-[520px]"
    >
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg rounded-full border shadow-lg p-1.5">
        {tools.map((tool) => {
          const isActive = pathname ? pathname.includes(tool.path) : false
          return (
            <motion.button
              key={tool.path}
              onClick={() => router.push(tool.path)}
              className={`
                flex-1 relative group rounded-full transition-all duration-300
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