import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { supabase } from '@/lib/supabase'

interface InstagramProfile {
  instagram_username: string | null;
  instagram_full_name: string | null;
  instagram_profile_picture: string | null;
  instagram_bio: string | null;
  instagram_followers_count: number | null;
  instagram_following_count: number | null;
  instagram_media_count: number | null;
}

export function InstagramProfile() {
  const [profile, setProfile] = useState<InstagramProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstagramProfile()
  }, [])

  const fetchInstagramProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('users')
        .select('instagram_username, instagram_full_name, instagram_profile_picture, instagram_bio, instagram_followers_count, instagram_following_count, instagram_media_count')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching Instagram profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">No Instagram profile connected</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.instagram_profile_picture || undefined} alt={profile.instagram_username || 'Instagram profile'} />
          <AvatarFallback>{profile.instagram_username?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{profile.instagram_full_name}</h3>
          <p className="text-sm text-muted-foreground">@{profile.instagram_username}</p>
        </div>
      </div>
      
      {profile.instagram_bio && (
        <p className="mt-4 text-sm">{profile.instagram_bio}</p>
      )}
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="font-semibold">{profile.instagram_media_count}</p>
          <p className="text-sm text-muted-foreground">Posts</p>
        </div>
        <div>
          <p className="font-semibold">{profile.instagram_followers_count}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="font-semibold">{profile.instagram_following_count}</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      </div>
    </Card>
  )
} 