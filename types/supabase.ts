export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
          last_login: string | null
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
        Insert: {
          id?: string
          email: string
          role?: string
          created_at?: string
          last_login?: string | null
          instagram_id?: string | null
          instagram_username?: string | null
          instagram_full_name?: string | null
          instagram_profile_picture?: string | null
          instagram_bio?: string | null
          instagram_website?: string | null
          instagram_followers_count?: number | null
          instagram_following_count?: number | null
          instagram_media_count?: number | null
          instagram_account_type?: string | null
          instagram_is_business?: boolean | null
          instagram_connected_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
          last_login?: string | null
          instagram_id?: string | null
          instagram_username?: string | null
          instagram_full_name?: string | null
          instagram_profile_picture?: string | null
          instagram_bio?: string | null
          instagram_website?: string | null
          instagram_followers_count?: number | null
          instagram_following_count?: number | null
          instagram_media_count?: number | null
          instagram_account_type?: string | null
          instagram_is_business?: boolean | null
          instagram_connected_at?: string | null
        }
      }
      instagram_business_accounts: {
        Row: {
          id: string
          user_id: string
          instagram_business_account_id: string
          username: string | null
          name: string | null
          profile_picture_url: string | null
          access_token: string
          token_type: string
          token_expires_at: string
          is_token_valid: boolean
          business_account_type: string | null
          media_count: number | null
          followers_count: number | null
          following_count: number | null
          website: string | null
          biography: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          instagram_business_account_id: string
          username?: string | null
          name?: string | null
          profile_picture_url?: string | null
          access_token: string
          token_type?: string
          token_expires_at: string
          is_token_valid?: boolean
          business_account_type?: string | null
          media_count?: number | null
          followers_count?: number | null
          following_count?: number | null
          website?: string | null
          biography?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          instagram_business_account_id?: string
          username?: string | null
          name?: string | null
          profile_picture_url?: string | null
          access_token?: string
          token_type?: string
          token_expires_at?: string
          is_token_valid?: boolean
          business_account_type?: string | null
          media_count?: number | null
          followers_count?: number | null
          following_count?: number | null
          website?: string | null
          biography?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      instagram_auth_sessions: {
        Row: {
          id: string
          user_id: string
          access_token: string
          refresh_token: string | null
          token_type: string
          expires_at: string
          scope: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          access_token: string
          refresh_token?: string | null
          token_type?: string
          expires_at: string
          scope?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          access_token?: string
          refresh_token?: string | null
          token_type?: string
          expires_at?: string
          scope?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      instagram_accounts: {
        Row: {
          id: string
          user_id: string
          instagram_user_id: string
          access_token: string
          token_expires_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          instagram_user_id: string
          access_token: string
          token_expires_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          instagram_user_id?: string
          access_token?: string
          token_expires_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      scheduled_posts: {
        Row: {
          id: string
          user_id: string
          caption: string | null
          media_type: string
          media_url: string
          scheduled_time: string
          status: string
          created_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          caption?: string | null
          media_type: string
          media_url: string
          scheduled_time: string
          status?: string
          created_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          caption?: string | null
          media_type?: string
          media_url?: string
          scheduled_time?: string
          status?: string
          created_at?: string
          published_at?: string | null
        }
      }
      instagram_webhooks: {
        Row: {
          id: string
          event_type: string
          data: Json
          processed: boolean
          created_at: string
          processed_at: string | null
        }
        Insert: {
          id?: string
          event_type: string
          data: Json
          processed?: boolean
          created_at?: string
          processed_at?: string | null
        }
        Update: {
          id?: string
          event_type?: string
          data?: Json
          processed?: boolean
          created_at?: string
          processed_at?: string | null
        }
      }
      token_verifications: {
        Row: {
          id: string
          user_id: string
          token: string
          verified_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          verified_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          verified_at?: string | null
          expires_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}