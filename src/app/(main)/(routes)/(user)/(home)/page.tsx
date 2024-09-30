import AboutSection from '@/components/about-section'
import Grid from '@/components/grid'
import Hero from '@/components/hero'
import PetsHome from '@/components/pets-section'
import Process from '@/components/process'

export default function Home() {
  return (
    <>
      <Hero />
      <Grid />
      <Process />
      <PetsHome />
      <AboutSection />
    </>
  )
}
