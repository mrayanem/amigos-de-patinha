'use client'

import { Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <footer className="bg-[#01377D] pb-20 md:pb-6">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8"></div>

          <div className="flex flex-col items-center justify-start lg:flex-row lg:justify-between lg:align-middle">
            <div className="flex flex-col justify-center lg:justify-start">
              <div className="flex justify-center gap-2 align-middle lg:justify-start">
                <Image
                  src="/logo-footer.svg"
                  className="object-contain"
                  alt="Flowbite Logo"
                  width={150}
                  height={150}
                />
              </div>

              <div className="lg:row ml-2 mt-4 justify-between lg:flex">
                <div className="flex items-center justify-center md:justify-end">
                  <a
                    href="/TermosDeUso-PolíticaDePrivacidade.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-white lg:text-right"
                  >
                    Termos de uso
                  </a>
                  <p className="mx-2 text-center text-sm text-white lg:text-right">
                    |
                  </p>
                  <a
                    href="/TermosDeUso-PolíticaDePrivacidade.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-white lg:text-right"
                  >
                    Política de Privacidade
                  </a>
                </div>
              </div>
            </div>
            <div className=" mr-3 mt-6 flex flex-col items-center justify-center gap-4 md:mt-0">
              <p className="font-semibold text-white">Siga-nos</p>
              <div className="flex gap-3">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Instagram />
                </a>
                {/* <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Facebook />
                </a> */}
              </div>
            </div>
          </div>
          <div className="lg:row mt-8 justify-between border-t-2 border-[#E5E5E5] pt-8 lg:flex">
            <p className="text-center text-sm text-white lg:text-left">
              © 2024 Amigos de patinha. CNPJ. 44.444.444/0001-04 - AMIGOS DE
              PATINHA
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
