'use client'

import AboutUs from '@/components/about-us/about'
import CarouselAbout from '@/components/about-us/carousel'
// import Grid from '@/components/about-us/grid-about'
import Hero from '@/components/about-us/hero'

export default function About() {
  return (
    <>
      <Hero />
      <AboutUs />
      <CarouselAbout />
      {/* <Grid /> */}
    </>
  )
}
