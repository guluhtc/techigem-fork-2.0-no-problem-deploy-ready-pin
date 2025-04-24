"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Users,
  TrendingUp,
  MessageSquare,
  Image,
  Hash,
  Menu,
  X,
  ChevronRight,
  Instagram
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    title: "Instagram",
    icon: Instagram,
    path: "/instagram"
  },
  {
    title: "Content Calendar",
    icon: Calendar,
    path: "/dashboard/calendar"
  },
  {
    title: "Media Library",
    icon: Image,
    path: "/dashboard/media"
  },
  {
    title: "Analytics",
    icon: TrendingUp,
    path: "/dashboard/analytics"
  },
  {
    title: "Audience",
    icon: Users,
    path: "/dashboard/audience"
  },
  {
    title: "Comments",
    icon: MessageSquare,
    path: "/dashboard/comments"
  },
  {
    title: "Hashtags",
    icon: Hash,
    path: "/dashboard/hashtags"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings"
  }
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isCollapsed ? "items-center" : "items-start"
      )}
    >
      <div className={cn(
        "flex h-14 items-center border-b px-6",
        isCollapsed ? "justify-center w-full" : "justify-between w-full"
      )}>
        {!isCollapsed && (
          <span className="font-bold text-xl gradient-text">Techigem</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={pathname === item.path ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              isCollapsed ? "px-0 justify-center" : "px-3"
            )}
            onClick={() => router.push(item.path)}
          >
            <item.icon className={cn(
              "h-5 w-5",
              isCollapsed ? "mr-0" : "mr-2"
            )} />
            {!isCollapsed && <span>{item.title}</span>}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}