"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { StatsCards } from '@/components/admin/stats-cards'
import { UsersTable } from '@/components/admin/users-table'
import { FeaturesTable } from '@/components/admin/features-table'
import { PlansTable } from '@/components/admin/plans-table'

interface User {
  id: string
  email: string
  role: string
  created_at: string
}

interface Feature {
  id: string
  name: string
  description: string
  is_active: boolean
  created_at: string
}

interface Plan {
  id: string
  name: string
  description: string
  price: number
  interval: string
  is_active: boolean
  created_at: string
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [
        { data: usersData },
        { data: featuresData },
        { data: plansData }
      ] = await Promise.all([
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        supabase.from('features').select('*').order('created_at', { ascending: false }),
        supabase.from('pricing_plans').select('*').order('created_at', { ascending: false })
      ])

      setUsers(usersData as User[] || [])
      setFeatures(featuresData as Feature[] || [])
      setPlans(plansData as Plan[] || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = (user: User) => {
    toast.info('Edit user coming soon')
  }

  const handleDeleteUser = (user: User) => {
    toast.info('Delete user coming soon')
  }

  const handleEditFeature = (feature: Feature) => {
    toast.info('Edit feature coming soon')
  }

  const handleDeleteFeature = (feature: Feature) => {
    toast.info('Delete feature coming soon')
  }

  const handleEditPlan = (plan: Plan) => {
    toast.info('Edit plan coming soon')
  }

  const handleDeletePlan = (plan: Plan) => {
    toast.info('Delete plan coming soon')
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-[#8B5CF6]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>

        <StatsCards
          userCount={users.length}
          featureCount={features.length}
          planCount={plans.length}
        />

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid md:grid-cols-3 gap-4">
            <TabsTrigger value="users" className="text-sm md:text-base">
              Users
            </TabsTrigger>
            <TabsTrigger value="features" className="text-sm md:text-base">
              Features
            </TabsTrigger>
            <TabsTrigger value="plans" className="text-sm md:text-base">
              Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          </TabsContent>

          <TabsContent value="features">
            <FeaturesTable
              features={features}
              onEdit={handleEditFeature}
              onDelete={handleDeleteFeature}
            />
          </TabsContent>

          <TabsContent value="plans">
            <PlansTable
              plans={plans}
              onEdit={handleEditPlan}
              onDelete={handleDeletePlan}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}