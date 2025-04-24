"use client"

import { motion } from "framer-motion"
import { Instagram, MapPin, Sparkles, Languages, Clock, Users, Star, Rocket, Zap, TrendingUp, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup-form"

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center text-center space-y-8 pt-32 md:pt-40 pb-12 md:pb-24 px-4 md:px-6 overflow-hidden"
    >
      {/* Enhanced background gradients */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-0 right-1/4 w-36 md:w-[500px] h-36 md:h-[500px] bg-[#FF9933]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-36 md:w-[500px] h-36 md:h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 md:w-[500px] h-36 md:h-[500px] bg-[#138808]/10 rounded-full blur-[100px] animate-pulse" />
      </motion.div>

      {/* Top badges with enhanced design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-3 flex-wrap justify-center w-full max-w-3xl mx-auto"
      >
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full border shadow-sm w-full sm:w-auto">
          <Star className="h-4 w-4 text-[#FF9933] flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800 truncate">भारत का #1 Instagram ग्रोथ प्लेटफॉर्म</span>
          <span className="text-lg">🚀</span>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full border shadow-sm w-full sm:w-auto">
          <Users className="h-4 w-4 text-[#138808] flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800">2,00,000+ क्रिएटर्स की पसंद</span>
          <span className="text-lg">🏆</span>
        </div>
      </motion.div>

      {/* Main content with enhanced typography */}
      <div className="max-w-4xl space-y-6 md:space-y-8 mt-12 md:mt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] md:leading-[1.2] text-gray-900">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="gradient-text block py-2"
          >
            Instagram पर बनें सुपरस्टार
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="block text-3xl sm:text-4xl md:text-5xl text-gray-700 mt-8"
          >
            AI-Powered Growth के साथ 🎯
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mt-8"
        >
          अपनी भाषा में बनाएं विश्वस्तरीय कंटेंट, करें स्मार्ट शेड्यूलिंग, और पाएं 10X ज़्यादा एंगेजमेंट। 
          हमारी AI टेक्नोलॉजी आपकी Instagram ग्रोथ को नई ऊंचाइयों तक ले जाएगी! ✨
        </motion.p>
      </div>

      {/* Enhanced CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xl mx-auto mt-8"
      >
        <SignUpForm />
      </motion.div>

      {/* Enhanced feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mx-auto mt-16">
        {[
          {
            icon: Languages,
            color: "#FF9933",
            title: "15+ भारतीय भाषाएं",
            subtitle: "अपनी भाषा में करें कंटेंट क्रिएशन"
          },
          {
            icon: Zap,
            color: "primary",
            title: "स्मार्ट AI टूल्स",
            subtitle: "विश्वस्तरीय कंटेंट बनाएं मिनटों में"
          },
          {
            icon: Users,
            color: "#138808",
            title: "24x7 एक्सपर्ट सपोर्ट",
            subtitle: "WhatsApp और कॉल पर तुरंत मदद"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-4 p-6 rounded-xl bg-white/95 backdrop-blur-sm border shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/20 group-hover:from-${feature.color}/20 group-hover:to-${feature.color}/30 transition-colors duration-300`}>
              <feature.icon className={`h-6 w-6 text-[${feature.color}]`} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">{feature.title}</span>
              <span className="text-sm text-gray-700">{feature.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pt-16 md:pt-24 text-center w-full"
      >
        <p className="text-base font-medium text-gray-800 mb-6">
          भारत के टॉप क्रिएटर्स और बिज़नेस की पहली पसंद 
          <span className="inline-block ml-2">🇮🇳</span>
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          {[
            "दिल्ली", "मुंबई", "बैंगलोर", "हैदराबाद", "चेन्नई", 
            "कोलकाता", "पुणे", "अहमदाबाद", "जयपुर", "लखनऊ"
          ].map((city, index) => (
            <motion.span
              key={city}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-sm text-gray-700 hover:text-primary transition-colors duration-300 cursor-pointer font-medium px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border hover:border-primary hover:bg-white/95"
            >
              {city}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}