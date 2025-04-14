import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  id: string
  title: string
  description: string
  image: string
  icon?: React.ReactNode
}

const ServiceCard = ({ id, title, description, image, icon }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden service-card">
      <div className="h-48 bg-primary/10 flex items-center justify-center relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="object-cover w-full h-full"
        />
        {icon && <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">{icon}</div>}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={`/servizi/${id}`}
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
        >
          Scopri di più
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard

