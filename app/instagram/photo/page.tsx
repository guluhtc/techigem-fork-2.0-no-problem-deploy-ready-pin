"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Download, User, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"

export default function PhotoDownloaderPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [imageData, setImageData] = useState<{
    url: string;
    type: string;
  } | null>(null)

  const handleDownload = async () => {
    if (!url) {
      toast.error("Please enter an Instagram URL")
      return
    }

    // Basic URL validation
    if (!url.includes('instagram.com')) {
      toast.error("Please enter a valid Instagram URL")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/instagram/photo/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to download image')
      }

      const imageBlob = await response.blob()
      const objectUrl = URL.createObjectURL(imageBlob)

      setImageData({
        url: objectUrl,
        type: imageBlob.type || 'image/jpeg'
      })

      toast.success("Image loaded successfully!")
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(error.message || "Failed to load image")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadImage = () => {
    if (!imageData) return

    const link = document.createElement('a')
    link.href = imageData.url
    link.download = `instagram-image.${imageData.type.split('/')[1] || 'jpg'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Image downloaded successfully!")
  }

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imageData?.url) {
        URL.revokeObjectURL(imageData.url)
      }
    }
  }, [imageData])

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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Instagram Image Downloader</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Download Instagram photos and profile pictures in high quality
              </p>
            </div>

            <DownloaderToggle />

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram URL</label>
                  <Input
                    placeholder="Paste Instagram profile or post URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-11"
                  />
                  <p className="text-sm text-muted-foreground">
                    Examples:<br />
                    Profile: https://www.instagram.com/username<br />
                    Post: https://www.instagram.com/p/ABC123xyz/
                  </p>
                </div>

                <Button
                  className="w-full h-11"
                  onClick={handleDownload}
                  disabled={isLoading || !url}
                >
                  {isLoading ? (
                    "Loading Image..."
                  ) : url.includes('/p/') ? (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Load Post Photo
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Load Profile Picture
                    </>
                  )}
                </Button>

                {imageData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageData.url}
                        alt="Instagram image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleDownloadImage}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </motion.div>
                )}

                {!imageData && !isLoading && (
                  <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                    <div className="text-center">
                      <Download className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p>Enter an Instagram URL and click Load</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-4 text-center">
              <h2 className="text-xl font-semibold">How to Download Instagram Images</h2>
              <div className="grid gap-4 text-sm text-muted-foreground">
                <p>1. Open Instagram and go to the profile or post</p>
                <p>2. Copy the URL from your browser&apos;s address bar</p>
                <p>3. Paste the URL above and click Load</p>
                <p>4. Click Download to save the image</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}