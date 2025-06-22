import Carousel from '@/components/Carousel';
import HeroSection from '@/components/HeroSection'
import SecondSection from '@/components/SecondSection'
import ThirdSection from '@/components/ThirdSection'
import React from 'react';


function Home() {
  return (
    <>
      <HeroSection />
      <SecondSection />
      <ThirdSection />
      <Carousel />
    </>
  )
}

export default Home
