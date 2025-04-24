"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Instagram, User, Image, Link, Users, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { InstagramLoginButton } from '@/components/instagram-login-button'
import { toast } from 'sonner'

interface UserProfile {
  id: string
  email: string
  role: string
  instagram_id: string | null
  instagram_username: string | null
  instagram_full_name: string | null
  instagram_profile_picture: string | null
  instagram_bio: string | null
  instagram_website: string | null
  instagram_followers_count: number | null
  instagram_following_count: number | null
  instagram_media_count: number | null
  instagram_account_type: string | null
  instagram_is_business: boolean | null
  instagram_connected_at: string | null
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        
        if (!authUser) {
          router.push('/login')
          return
        }

        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (error) {
          console.error('Error fetching user profile:', error)
          toast.error('Failed to load profile')
          return
        }

        setUser(profile)
      } catch (error) {
        console.error('Error:', error)
        toast.error('Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            {user?.instagram_profile_picture ? (
              <img 
                src={user.instagram_profile_picture} 
                alt={user.instagram_username || 'Profile'} 
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold">
                {user?.instagram_full_name || user?.email}
              </h2>
              <p className="text-gray-600">
                {user?.instagram_username ? `@${user.instagram_username}` : 'No Instagram account connected'}
              </p>
            </div>
          </div>

          {!user?.instagram_id && (
            <div className="mt-4">
              <InstagramLoginButton />
            </div>
          )}
        </Card>

        {/* Instagram Stats Card */}
        {user?.instagram_id && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Instagram Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="font-semibold">{user.instagram_followers_count?.toLocaleString() || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Following</p>
                  <p className="font-semibold">{user.instagram_following_count?.toLocaleString() || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Image className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Posts</p>
                  <p className="font-semibold">{user.instagram_media_count?.toLocaleString() || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Connected Since</p>
                  <p className="font-semibold">
                    {user.instagram_connected_at 
                      ? new Date(user.instagram_connected_at).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Instagram Bio Card */}
      {user?.instagram_bio && (
        <Card className="p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{user.instagram_bio}</p>
          {user.instagram_website && (
            <a 
              href={user.instagram_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-primary hover:underline"
            >
              <Link className="w-4 h-4 mr-2" />
              {user.instagram_website}
            </a>
          )}
        </Card>
      )}
    </div>
  )
}