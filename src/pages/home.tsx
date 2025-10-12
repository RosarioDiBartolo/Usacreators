import Features from '@/components/features'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Sections from '@/components/sections' 
 
function Home() {
  return (
<div className="">
      <div className=" bg-primary">
        <Header />

        <Hero />
        <Features />
      </div>
      <Sections /> 
    </div>  )
}

export default Home