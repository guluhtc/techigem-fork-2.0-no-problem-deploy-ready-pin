"use client"

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Settings2, Save, RefreshCw, Key, Instagram, AlertCircle } from 'lucide-react'
import { instagramConfig } from '@/lib/instagram/config'
import { InstagramLoginButton } from '@/components/instagram/login-button'
import { supabase } from '@/lib/supabase'
import { verifyToken, refreshToken } from '@/lib/instagram/token'

export function InstagramSettingsManager() {
  const [settings, setSettings] = useState({
    autoPublish: false,
    notifyOnEngagement: true,
    autoModerateComments: false,
    storyArchiving: true,
    hashtagLimit: instagramConfig.settings.postingLimits.maxHashtags,
    captionLimit: instagramConfig.settings.postingLimits.maxCaptionLength,
  })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [tokenStatus, setTokenStatus] = useState<{
    isValid: boolean;
    expiresIn?: number;
    error?: string;
  }>({ isValid: false })

  useEffect(() => {
    checkInstagramConnection()
  }, [])

  const checkInstagramConnection = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data: account } = await supabase
        .from('instagram_accounts')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (account) {
        setIsConnected(true)
        const status = await verifyToken(session.user.id)
        setTokenStatus(status)
      }
    } catch (error) {
      console.error('Error checking Instagram connection:', error)
    }
  }

  const handleRefreshToken = async () => {
    setIsRefreshing(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const result = await refreshToken(session.user.id)
      if (!result.isValid) {
        throw new Error(result.error)
      }

      setTokenStatus(result)
      toast.success('Access token refreshed successfully')
    } catch (error: any) {
      console.error('Error refreshing token:', error)
      toast.error(error.message || 'Failed to refresh token')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Here you would implement the settings save logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const formatExpiresIn = (seconds?: number) => {
    if (!seconds) return 'Unknown'
    const days = Math.floor(seconds / (24 * 60 * 60))
    return `${days} days`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Instagram Advanced Settings
        </CardTitle>
        <CardDescription>
          Configure advanced settings for your Instagram integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Instagram Connection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Instagram Connection</h3>
            <div className="space-y-4">
              {isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-[#E4405F]" />
                        <span className="font-medium">Connected</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your Instagram Business account is connected
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefreshToken}
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      Refresh Token
                    </Button>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    tokenStatus.isValid ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {tokenStatus.isValid ? (
                        <div className="rounded-full p-1 bg-green-100">
                          <Key className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="rounded-full p-1 bg-yellow-100">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {tokenStatus.isValid ? 'Token Valid' : 'Token Issue'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tokenStatus.isValid
                            ? `Expires in ${formatExpiresIn(tokenStatus.expiresIn)}`
                            : tokenStatus.error || 'Token validation failed'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <InstagramLoginButton />
              )}
            </div>
          </div>

          {/* API Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">API Configuration</h3>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">App ID</label>
                <Input
                  value={instagramConfig.appId}
                  disabled
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          {/* Posting Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Posting Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Auto-Publish</label>
                  <div className="text-sm text-muted-foreground">
                    Automatically publish scheduled posts
                  </div>
                </div>
                <Switch
                  checked={settings.autoPublish}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoPublish: checked }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Hashtag Limit</label>
                <Input
                  type="number"
                  value={settings.hashtagLimit}
                  onChange={(e) => 
                    setSettings(prev => ({ 
                      ...prev, 
                      hashtagLimit: parseInt(e.target.value) 
                    }))
                  }
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Caption Character Limit</label>
                <Input
                  type="number"
                  value={settings.captionLimit}
                  onChange={(e) => 
                    setSettings(prev => ({ 
                      ...prev, 
                      captionLimit: parseInt(e.target.value) 
                    }))
                  }
                  min="1"
                  max="2200"
                />
              </div>
            </div>
          </div>

          {/* Engagement Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Engagement Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Engagement Notifications</label>
                  <div className="text-sm text-muted-foreground">
                    Get notified about new engagement
                  </div>
                </div>
                <Switch
                  checked={settings.notifyOnEngagement}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifyOnEngagement: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Auto-Moderate Comments</label>
                  <div className="text-sm text-muted-foreground">
                    Automatically moderate inappropriate comments
                  </div>
                </div>
                <Switch
                  checked={settings.autoModerateComments}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoModerateComments: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Story Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Story Settings</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Story Archiving</label>
                <div className="text-sm text-muted-foreground">
                  Automatically archive expired stories
                </div>
              </div>
              <Switch
                checked={settings.storyArchiving}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, storyArchiving: checked }))
                }
              />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}