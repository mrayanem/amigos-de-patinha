'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <>
      <section className="mx-auto mb-5 mt-10 px-4 md:mb-10 xl:max-w-[1200px]">
        <div>
          <div
            className="mx-auto mb-5 flex h-auto max-w-[1200px] flex-col items-center justify-center justify-items-center rounded-[20px] p-10 shadow-md md:mb-10 md:h-[600px] md:rounded-[60px]"
            style={{
              backgroundImage: "url('/bg-hero.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full items-center">
                <h1 className="text-center text-6xl font-extrabold md:text-left md:text-[95px]">
                  Amigo não se compra, se adota!
                </h1>
              </div>
              <div className="md:1/2 w-full">
                <div className="relative hidden w-full lg:flex">
                  <Image
                    src="/dog-hero.png"
                    width={600}
                    height={600}
                    alt="logo-amigos-de-patinha"
                    className="absolute -right-[40px] -top-[110px]"
                  />
                </div>
                <div className="relative hidden w-full md:flex lg:hidden">
                  <Image
                    src="/dog-hero.png"
                    width={600}
                    height={600}
                    alt="logo-amigos-de-patinha"
                    className="absolute -right-[40px] -top-[10px]"
                  />
                </div>
                <div className="relative flex w-full md:hidden">
                  <Image
                    src="/golden.svg"
                    width={600}
                    height={600}
                    alt="logo-amigos-de-patinha"
                    className="-mb-10"
                  />
                </div>

                {/* <div className="relative w-full overflow-hidden">
                <Image
                  priority
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="NextUI hero Image"
                  src="/dog-hero.png"
                  className=""
                />
              </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            {/* <Button className="text-md w-full rounded-[10px] bg-[#01377D] font-medium text-white hover:bg-[#084390] md:w-[336px]">
              Quero adotar
            </Button>
            <Button className="text-md w-full rounded-[10px] border-2 border-[#01377D] bg-transparent font-medium text-[#01377D] hover:border-[#084390] hover:bg-slate-100 hover:text-[#084390] md:w-[336px]">
              Quero divulgar um animal
            </Button> */}
            <Button
              asChild={true}
              className="text-md w-full rounded-[10px] bg-[#01377D] font-medium text-white hover:bg-[#084390] md:w-[336px]"
            >
              <a href="/adoption" target="" rel="noopener noreferrer">
                Quero adotar
              </a>
            </Button>
            <Button
              asChild={true}
              className="text-md w-full rounded-[10px] border-2 border-[#01377D] bg-transparent font-medium text-[#01377D] hover:border-[#084390] hover:bg-slate-100 hover:text-[#084390] md:w-[336px]"
            >
              <a href="/cadastro" target="" rel="noopener noreferrer">
                Quero divulgar um animal
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
