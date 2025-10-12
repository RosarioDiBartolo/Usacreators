import Features from '@/components/features'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Sections from '@/components/sections' 
 
function Home() {
  return (
<div className="">
      <div className=" ">
        <Header />

        <Hero />
        <Features />
       </div>
              <div className=' h-22 bg-primary' />

      <Sections /> 
    </div>  )
}

export default Home