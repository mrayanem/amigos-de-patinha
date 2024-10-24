'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ScaleImage = ({
  src,
  width,
  height,
  alt,
}: {
  src: string
  width: number
  height: number
  alt: string
}) => (
  <motion.div
    whileHover={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <Image src={src} width={width} height={height} alt={alt} />
  </motion.div>
)

export default function Grid() {
  return (
    <>
      <section className="px-4 pb-10 pt-10 md:pb-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center">
          <div className="mb-10 flex w-full flex-col items-center justify-between md:flex-row lg:max-w-[1150px]">
            <div className="mb-4 flex flex-col md:mb-0">
              <h2 className="text-4xl font-semibold text-[#01377D]">
                Adote seu melhor amigo!
              </h2>
              <span className="text-xl text-black">
                Venha, e entenda os benefícios da adoção!
              </span>
            </div>
            <Button
              asChild={true}
              className="text-md flex w-full items-center rounded-[10px] border-2 border-[#01377D] bg-transparent font-medium text-[#01377D] hover:border-[#084390] hover:bg-slate-100 hover:text-[#084390] md:w-[145px]"
            >
              <a href="/adoption" target="" rel="noopener noreferrer">
                Adoção <ChevronRight />
              </a>
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 md:flex-col">
            <div className="flex flex-col gap-4 md:flex-row">
              <ScaleImage
                src="/grid-home/gato1.png"
                width={225}
                height={300}
                alt="logo-amigos-de-patinha"
              />
              <ScaleImage
                src="/grid-home/gato-cachorro1.png"
                width={300}
                height={300}
                alt="logo-amigos-de-patinha"
              />
              <ScaleImage
                src="/grid-home/gato2.png"
                width={595}
                height={300}
                alt="logo-amigos-de-patinha"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <ScaleImage
                src="/grid-home/cachorro1.png"
                width={225}
                height={300}
                alt="logo-amigos-de-patinha"
              />
              <ScaleImage
                src="/grid-home/gato-cachorro2.png"
                width={698}
                height={300}
                alt="logo-amigos-de-patinha"
              />
              <ScaleImage
                src="/grid-home/gato3.png"
                width={200}
                height={300}
                alt="logo-amigos-de-patinha"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
