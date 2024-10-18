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

export default function AboutUs() {
  return (
    <>
      <section className="px-4 py-20">
        <FadeInSection>
          <div className="mx-auto flex max-w-[1400px] flex-col items-center">
            <div className="flex flex-row items-center gap-x-10">
              <div className="flex w-1/2 flex-col items-start justify-center">
                <h2 className="pb-2 text-2xl font-semibold text-[#152336]">
                  Adotar é mais do que um ato de amor...
                </h2>
                <p className="text-medium text-lg">
                  Ter um pet traz amor e alegria, aliviando o estresse e
                  proporcionando companhia fiel. ONGs são vitais para resgatar e
                  cuidar dos animais, promovendo a adoção e a posse responsável,
                  garantindo que mais animais recebam o amor que merecem.
                </p>
              </div>

              <div className="flex w-1/2 flex-col items-center justify-center">
                <Image
                  src="/about/element-img.png"
                  width={500}
                  height={500}
                  alt="logo-amigos-de-patinha"
                />
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  )
}
