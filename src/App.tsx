 

import Features from './components/features'
import Header from './components/header'
import Hero from './components/hero'
import Sections from './components/sections'
import SiginForm from './components/sigin-form'

function App() {
 
  return (
    <div className=''>
      <div className=' bg-primary'>
        
 <Header /> 
      
      <Hero />
      <Features />
      
      </div>
      <Sections />
      <SiginForm />
    </div>
  )
}

export default App
