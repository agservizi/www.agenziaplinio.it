"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: FAQ[]
}

const FAQSection = ({
  title = "Domande Frequenti",
  description = "Trova le risposte alle domande più comuni sui nostri servizi.",
  faqs,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-[#f5f5f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-900 hover:text-primary transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="flex-shrink-0 ml-2" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  <div className="text-gray-600 answer-content">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
