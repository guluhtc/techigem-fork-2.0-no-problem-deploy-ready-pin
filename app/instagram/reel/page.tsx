"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Film, Loader2, Download } from "lucide-react"
import { toast } from "sonner"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"

export default function ReelDownloaderPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [reelData, setReelData] = useState<{
    url: string;
    type: string;
  } | null>(null)

  const handleDownload = async () => {
    if (!url) {
      toast.error("Please enter an Instagram reel URL")
      return
    }

    // Basic URL validation
    if (!url.includes('instagram.com/')) {
      toast.error("Please enter a valid Instagram URL")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/instagram/reel/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to download reel')
      }

      const reelBlob = await response.blob()
      const objectUrl = URL.createObjectURL(reelBlob)

      setReelData({
        url: objectUrl,
        type: reelBlob.type || 'video/mp4'
      })

      toast.success("Reel loaded successfully!")
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(error.message || "Failed to load reel")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadReel = () => {
    if (!reelData) return

    const link = document.createElement('a')
    link.href = reelData.url
    link.download = `instagram-reel.${reelData.type.split('/')[1] || 'mp4'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Reel downloaded successfully!")
  }

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (reelData?.url) {
        URL.revokeObjectURL(reelData.url)
      }
    }
  }, [reelData])

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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Instagram Reel Downloader</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Download Instagram reels in high quality
              </p>
            </div>

            <DownloaderToggle />

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram Reel URL</label>
                  <Input
                    placeholder="Paste Instagram reel URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-11"
                  />
                  <p className="text-sm text-muted-foreground">
                    Example: https://www.instagram.com/reel/ABC123xyz/
                  </p>
                </div>

                <Button
                  className="w-full h-11"
                  onClick={handleDownload}
                  disabled={isLoading || !url}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Reel...
                    </>
                  ) : (
                    <>
                      <Film className="mr-2 h-4 w-4" />
                      Load Reel
                    </>
                  )}
                </Button>

                {reelData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-[9/16] rounded-lg overflow-hidden border">
                      <video
                        src={reelData.url}
                        controls
                        className="w-full h-full"
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleDownloadReel}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Reel
                    </Button>
                  </motion.div>
                )}

                {!reelData && !isLoading && (
                  <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                    <div className="text-center">
                      <Film className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p>Enter an Instagram reel URL and click Load</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-4 text-center">
              <h2 className="text-xl font-semibold">How to Download Instagram Reels</h2>
              <div className="grid gap-4 text-sm text-muted-foreground">
                <p>1. Open Instagram and go to the reel you want to download</p>
                <p>2. Copy the reel URL from your browser&apos;s address bar</p>
                <p>3. Paste the URL above and click Load</p>
                <p>4. Click Download to save the reel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}