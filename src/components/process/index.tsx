'use client'

import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.9 },
        },
        hidden: {
          opacity: 0,
          y: 50,
          filter: 'blur(3px)',
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Process() {
  return (
    <>
      <section className="px-4 pb-10 pt-10 md:pb-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center">
          <FadeInSection>
            <div className="mb-12 flex flex-col items-center justify-center self-center">
              <h2 className="text-4xl font-semibold text-[#01377D]">
                Adote seu melhor amigo!
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-rows-1 gap-4 md:grid-cols-3">
            <FadeInSection>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-[#A6DCEE] p-5">
                  <Image
                    src="/process/foto1.svg"
                    width={250}
                    height={250}
                    alt="logo-amigos-de-patinha"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mb-2 text-2xl font-semibold">
                    Escolha do animal
                  </h3>
                  <span className="text-left text-xl text-[#4F4747]">
                    Na nossa ONG, acreditamos que a adoção de um animal de
                    estimação é uma decisão importante e deve ser feita com
                    muito cuidado e responsabilidade.
                  </span>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-[#D2F0BF] p-5">
                  <Image
                    src="/process/foto2.svg"
                    width={250}
                    height={250}
                    alt="logo-amigos-de-patinha"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mb-2 text-2xl font-semibold">
                    Teste com animal
                  </h3>
                  <span className="text-left text-xl text-[#4F4747]">
                    Para garantir que cada animal encontre um lar adequado,
                    nossa ONG realiza testes de comportamento com os gatos e
                    cachorros disponíveis para adoção
                  </span>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-[#B3E4CD] p-5">
                  <Image
                    src="/process/foto3.svg"
                    width={250}
                    height={250}
                    alt="logo-amigos-de-patinha"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mb-2 text-2xl font-semibold">Adoção</h3>
                  <span className="text-left text-xl text-[#4F4747]">
                    A etapa final da adoção é um momento emocionante. Após todas
                    as avaliações e preparações, seguimos um processo cuidadoso
                    para garantir uma transição suave e segura para o novo lar.
                  </span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  )
}
