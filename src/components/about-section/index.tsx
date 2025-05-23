'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <>
      <section className="mx-auto mb-5 px-4 pb-16 pt-16 md:mb-10 xl:max-w-[1200px]">
        <div>
          <div className="mx-auto mb-5 flex h-auto max-w-[1200px] flex-col items-center justify-center justify-items-center rounded-[20px] bg-[#CCEBF6] p-10 shadow-md md:mb-10 md:h-[600px] md:flex-row md:rounded-[60px]">
            <div className="md:1/2 w-full">
              <div className="relative hidden w-full md:flex">
                <Image
                  src="/hero-about2.svg"
                  width={800}
                  height={800}
                  alt="logo-amigos-de-patinha"
                  className="absolute -top-[200px]"
                />
              </div>
            </div>
            <div className="md:1/2 items-left flex w-full flex-col justify-center">
              <h2 className="font-bold md:text-[60px]">
                Deseja saber mais sobre nós?
              </h2>
              <Button
                asChild={true}
                className="text-md flex w-full items-center justify-between rounded-[10px] border-2 border-[#01377D] bg-transparent font-medium text-[#01377D] hover:border-[#084390a5] hover:bg-transparent hover:text-[#084390a5] md:w-[150px]"
              >
                <a href="/about" target="" rel="noopener noreferrer">
                  Sobre nós
                  <ChevronRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
