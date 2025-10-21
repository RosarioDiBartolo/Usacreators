import Features from '@/components/features/features-sections'
import Header from '@/components/header'
import Hero from '@/components/hero'
import CreatorsBrands from '@/components/creator-brand'
import Footer from '@/components/footer'

function Home() {
  return (
<div className="">
      <div className=" pb-28 ">
        <Header />

        <Hero />
        <Features />
       </div>

      <CreatorsBrands />
      <Footer />
    </div>  )
}

export default Home
