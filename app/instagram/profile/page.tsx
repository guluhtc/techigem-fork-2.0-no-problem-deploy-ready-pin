"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { User, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"

export default function ProfilePicturePage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleView = async () => {
    if (!username) {
      toast.error("Please enter an Instagram username")
      return
    }

    setIsLoading(true)
    try {
      toast.info("Profile picture viewer coming soon!")
    } catch (error) {
      toast.error("Failed to load profile picture")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Instagram Profile Picture Viewer</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                View and download Instagram profile pictures in full size
              </p>
            </div>

            <DownloaderToggle />

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram Username</label>
                  <Input
                    placeholder="Enter Instagram username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11"
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleView}
                  disabled={isLoading || !username}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Profile Picture...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      View Profile Picture
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}