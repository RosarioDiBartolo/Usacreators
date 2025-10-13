import Features from '@/components/features/features-sections'
import Header from '@/components/header'
import Hero from '@/components/hero'
import CreatorsBrands from '@/components/creator-brand' 
 
function Home() {
  return (
<div className="">
      <div className=" ">
        <Header />

        <Hero />  
        <Features />
       </div>
 
      <CreatorsBrands />
    </div>  )
}

export default Home