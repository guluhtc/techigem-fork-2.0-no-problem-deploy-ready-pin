"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from 'next/image'

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Digital Content Creator",
    company: "Tech Influencer",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa",
    content: "टेकीजेम ने मेरी Instagram ग्रोथ को नई ऊंचाइयों तक पहुंचाया है। AI कैप्शन और शेड्यूलिंग टूल्स से मेरी एंगेजमेंट रेट 200% बढ़ गई है!",
    rating: 5
  },
  {
    name: "Rajesh Patel",
    role: "Business Coach",
    company: "Digital Marketing Expert",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    content: "मैं अपने सभी क्लाइंट्स को टेकीजेम रेकमेंड करता हूं। इसके AI टूल्स और एनालिटिक्स ने मेरी टीम की प्रोडक्टिविटी को 3X बढ़ा दिया है।",
    rating: 5
  },
  {
    name: "Anjali Desai",
    role: "Fashion Influencer",
    company: "Style & Trends",
    image: "https://images.unsplash.com/photo-1657214059493-986710bc4788",
    content: "एक फैशन इन्फ्लुएंसर के तौर पर, कंसिस्टेंसी बहुत जरूरी है। टेकीजेम की मदद से मैं रोज़ाना क्वालिटी कंटेंट पोस्ट कर पाती हूं। बेस्ट टूल!",
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-24"
    >
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-bold gradient-text">भारत के टॉप क्रिएटर्स की पसंद</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          देखिए टेकीजेम के यूज़र्स का अनुभव और सफलता की कहानियां
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 h-full space-y-4 relative group hover:shadow-xl transition-all duration-300 glass-card">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />

              <p className="text-muted-foreground relative z-10">{testimonial.content}</p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-primary to-[#138808] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}