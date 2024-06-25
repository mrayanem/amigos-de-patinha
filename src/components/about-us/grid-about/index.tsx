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

export default function Grid() {
  return (
    <>
      <section className="px-4 pb-10 pt-10 md:pb-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:grid-rows-3">
            <FadeInSection>
              <div className="flex h-auto w-full flex-col justify-center bg-[#95D9B9] p-12 text-left md:rounded-r-[30px] lg:h-[500px]">
                {/* <h2 className="pb-4 text-left text-4xl font-bold">Missão</h2> */}
                <p className="text-md">
                  Na Amigos de Patinha, nossa missão é transformar a vida de
                  gatos e cachorros abandonados, oferecendo-lhes uma segunda
                  chance para encontrar lares cheios de amor e cuidado.
                  Resgatamos animais em situação de risco, fornecemos cuidados
                  veterinários, alimentação adequada e um ambiente seguro
                  enquanto aguardam adoção. Promovemos campanhas de
                  conscientização sobre a posse responsável e a importância da
                  esterilização, e realizamos feiras de adoção para facilitar o
                  encontro entre nossos resgatados e suas futuras famílias.
                  Valorizamos a educação comunitária, ensinando sobre o respeito
                  e a empatia pelos animais, visando uma sociedade mais
                  compassiva. Junte-se a nós nesta missão. Adote, doe,
                  voluntarie-se. Vamos transformar vidas, uma adoção por vez.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="relative mx-auto hidden h-[500px] w-[400px] items-center justify-center self-center overflow-hidden md:flex">
                <Image
                  priority
                  fill
                  objectFit="cover"
                  alt="NextUI hero Image"
                  src="/about/adocao.png"
                />
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="relative mx-auto hidden h-[500px] w-[400px] items-center justify-center self-center overflow-hidden md:flex">
                <Image
                  priority
                  fill
                  objectFit="cover"
                  alt="NextUI hero Image"
                  src="/about/adocao2.png"
                />
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="flex h-auto w-full flex-col justify-center bg-[#D2F0BF] p-12 text-left md:rounded-l-[30px] lg:h-[500px]">
                {/* <h2 className="pb-4 text-left text-4xl font-bold">Visão</h2> */}
                <p className="text-md">
                  Nosso objetivo é construir um mundo onde todos os animais
                  abandonados, especialmente gatos e cachorros, tenham a chance
                  de viver vidas plenas, cercados pelo amor e cuidado que
                  merecem. Almejamos ser uma força motriz na transformação da
                  sociedade, inspirando e capacitando comunidades a adotarem
                  práticas compassivas e responsáveis em relação aos animais.
                  Visualizamos um futuro onde a compaixão e o respeito pelos
                  animais são valores fundamentais, e onde a Amigos de Patinha
                  seja reconhecida globalmente como uma líder na defesa e
                  proteção dos animais em situação de vulnerabilidade.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="flex h-auto w-full flex-col justify-center bg-[#CCEBF6] p-12 text-left md:rounded-r-[30px] lg:h-[500px]">
                {/* <h2 className="pb-4 text-left text-4xl font-bold">Valores</h2> */}
                <p className="text-md">
                  Comprometimento com o bem-estar animal: Priorizamos o cuidado
                  e o conforto dos gatos e cachorros resgatados, garantindo que
                  recebam atenção e tratamento adequados. Responsabilidade e
                  ética: Mantemos altos padrões de integridade em todas as
                  nossas ações, desde o resgate até a adoção, promovendo a posse
                  responsável e a esterilização como medidas essenciais para o
                  controle populacional e o bem-estar dos animais. Empatia e
                  respeito: Valorizamos a conexão emocional com os animais e
                  buscamos promover uma cultura de respeito e compaixão por
                  todas as formas de vida. Transparência e prestação de contas:
                  Mantemos uma comunicação aberta e transparente com nossos
                  apoiadores, voluntários e adotantes, demonstrando
                  responsabilidade na gestão de recursos e no cumprimento de
                  nossa missão.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="relative mx-auto hidden h-[500px] w-[400px] items-center justify-center self-center overflow-hidden md:flex">
                <Image
                  priority
                  fill
                  objectFit="cover"
                  alt="NextUI hero Image"
                  src="/about/adocao3.png"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  )
}
