"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { 
  Sparkles, PenSquare, MessageSquare, Brain, 
  Repeat2, TrendingUp, Calendar, Upload, 
  LayoutGrid, Palette, Lock, Search, Wand2,
  Hash, Target, Zap, Bot, Lightbulb, Megaphone
} from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface Tool {
  icon: React.ElementType;
  title: string;
  description: string;
  locked: boolean;
  category: string;
}

const tools: Tool[] = [
  {
    icon: PenSquare,
    title: "Generate Post",
    description: "Enter your topic, get a ready-to-publish social post.",
    locked: false,
    category: "Content Creation"
  },
  {
    icon: MessageSquare,
    title: "Generate Caption",
    description: "Enter your topic, get a high-quality, and tailored post.",
    locked: false,
    category: "Content Creation"
  },
  {
    icon: Brain,
    title: "Brainstorm Ideas",
    description: "Get relevant and engaging post ideas for your account.",
    locked: false,
    category: "Ideation"
  },
  {
    icon: Repeat2,
    title: "Repurpose Content",
    description: "Turn your existing content into multiple social posts.",
    locked: false,
    category: "Content Creation"
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Discover and analyze viral content trends.",
    locked: false,
    category: "Research"
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    description: "AI-powered content planning and scheduling.",
    locked: true,
    category: "Planning"
  },
  {
    icon: Hash,
    title: "Hashtag Generator",
    description: "Generate targeted hashtags for maximum reach.",
    locked: false,
    category: "Optimization"
  },
  {
    icon: Target,
    title: "Audience Insights",
    description: "AI analysis of your audience preferences.",
    locked: true,
    category: "Research"
  },
  {
    icon: LayoutGrid,
    title: "Carousel Creator",
    description: "Create engaging multi-slide content easily.",
    locked: false,
    category: "Content Creation"
  },
  {
    icon: Bot,
    title: "Chat Assistant",
    description: "Get instant help with content creation.",
    locked: false,
    category: "Support"
  },
  {
    icon: Lightbulb,
    title: "Content Strategy",
    description: "AI-powered content strategy recommendations.",
    locked: true,
    category: "Planning"
  },
  {
    icon: Megaphone,
    title: "Engagement Boost",
    description: "Smart suggestions to increase engagement.",
    locked: true,
    category: "Optimization"
  }
]

// Create a unique array of categories using Array.from instead of spread operator
const categories = Array.from(new Set(tools.map(tool => tool.category)))

export function AiTools() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleToolClick = (tool: Tool) => {
    if (tool.locked) {
      toast.info("Setup Brand Hub to unlock this feature!", {
        description: "Upgrade your account to access premium AI tools.",
        action: {
          label: "Upgrade",
          onClick: () => toast.info("Upgrade feature coming soon!")
        }
      })
    } else {
      setSelectedTool(tool)
      setIsDialogOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 animate-pulse"></div>
              <Sparkles className="relative h-6 w-6 text-primary" />
            </div>
            <span className="gradient-text">AI Tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-6 flex flex-col items-start gap-4 relative group hover:border-primary hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  onClick={() => handleToolClick(tool)}
                >
                  {tool.locked && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <tool.icon className="relative h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-2 text-left">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tool.category}
                      </span>
                      {!tool.locked && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedTool && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedTool.icon className="h-6 w-6 text-primary" />
                {selectedTool.title}
              </DialogTitle>
              <DialogDescription>
                {selectedTool.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Enter your topic or prompt..."
                    className="pr-12"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7"
                    onClick={() => toast.info("AI processing coming soon!")}
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 inline-block mr-1" />
                  Powered by advanced AI for optimal results
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}