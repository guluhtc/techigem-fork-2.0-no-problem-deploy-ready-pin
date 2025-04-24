"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Download, Video, Film, Ghost, User } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const tools = [
  {
    icon: Download,
    title: "Photo Downloader",
    description: "Download Instagram photos in original high quality resolution. Save your favorite photos easily.",
    path: "/instagram/photo",
    gradient: "from-[#405DE6] via-[#5B51D8] to-[#833AB4]"
  },
  {
    icon: Video,
    title: "Video Downloader",
    description: "Save Instagram videos easily",
    path: "/instagram/video",
    gradient: "from-[#833AB4] via-[#C13584] to-[#E1306C]"
  },
  {
    icon: Film,
    title: "Reel Downloader",
    description: "Download Instagram reels in HD",
    path: "/instagram/reel",
    gradient: "from-[#E1306C] via-[#F77737] to-[#FCAF45]"
  },
  {
    icon: Ghost,
    title: "Story Viewer",
    description: "View and save Instagram stories",
    path: "/instagram/story",
    gradient: "from-[#FCAF45] via-[#F77737] to-[#FD1D1D]"
  },
  {
    icon: User,
    title: "Profile Picture",
    description: "Download full-size Instagram profile pictures in original quality. View HD avatars.",
    path: "/instagram/profile",
    gradient: "from-[#FD1D1D] via-[#E1306C] to-[#C13584]"
  }
]

export function DownloaderCards() {
  const router = useRouter()

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {tools.map((tool, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(tool.path)}
              className="cursor-pointer h-[220px]" // Fixed height for consistent sizing
            >
              <Card className="p-6 h-full space-y-4 overflow-hidden relative group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full`} />
                  <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.gradient}`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold line-clamp-1">{tool.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{tool.description}</p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Card>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:flex">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  )
}