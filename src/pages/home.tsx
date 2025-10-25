import Features from '@/components/features/features-sections'
import Header from '@/components/header'
import Hero from '@/components/hero'
import CreatorsBrands from '@/components/creator-brand'
import Footer from '@/components/footer'
import VideosSlider from '@/components/videos-slider'
import FAQ from '@/components/faq'

function Home() {
  return (
<div className="flex flex-col">
      <div className=" pb-28 ">
        <Header />

        <Hero />
        <VideosSlider />
        <Features />
        <FAQ />
       </div>
      <div className=' bg-gradient-to-b from-background to-primary/50
      lg:pb-40'>
        <CreatorsBrands />
      <Footer />

      </div>

    </div>  )
}

export default Home
