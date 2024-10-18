import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden')
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

export default function CarouselAbout() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const [api, setApi] = useState<CarouselApi>()

  const carouselItems = [
    '/about/adocao.png',
    '/about/adocao2.png',
    '/about/adocao3.png',
  ]

  return (
    <section className="flex h-screen w-full items-center">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <Carousel
              plugins={[plugin.current]}
              className="w-full p-10"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              setApi={setApi}
            >
              <CarouselContent>
                {carouselItems.map((src, index) => (
                  <CarouselItem key={index}>
                    <FadeInSection>
                      <div className="relative h-[400px] w-full">
                        <Image
                          src={src}
                          alt={`Imagem ${index + 1}`}
                          layout="fill"
                          className="rounded-[8px]"
                          objectFit="cover"
                        />
                      </div>
                    </FadeInSection>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-5 flex justify-start gap-5">
                <button
                  className="flex h-[30px] w-[50px] items-center justify-center rounded-[4px] bg-[#01377D] text-white"
                  onClick={() => api?.scrollPrev()}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="flex h-[30px] w-[50px] items-center justify-center rounded-[4px] bg-[#01377D] text-white"
                  onClick={() => api?.scrollNext()}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </Carousel>
          </div>
          <div className="flex flex-col justify-center">
            <FadeInSection>
              <span className="text-2xl font-bold text-[#01377D]">
                Missão, Visão, Valores
              </span>
              <p className="text-md pt-2">
                Na Amigos de Patinha, nosso compromisso é transformar a vida de
                gatos e cachorros abandonados. Priorizamos o bem-estar animal,
                garantindo cuidados adequados e um ambiente seguro enquanto
                aguardam adoção. Mantemos altos padrões de responsabilidade e
                ética, promovendo a posse responsável e a esterilização como
                essenciais para o controle populacional. Valorizamos a empatia e
                o respeito, buscando inspirar comunidades a adotarem práticas
                compassivas. Com transparência e comunicação aberta, trabalhamos
                para construir um futuro onde todos os animais tenham a chance
                de viver rodeados de amor e cuidado. Junte-se a nós nessa
                missão: adote, doe e voluntarie-se. Vamos transformar vidas, uma
                adoção por vez.
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}
