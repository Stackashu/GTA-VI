import React, { useState } from 'react'
import IntroAnimation from './component/IntroAnimation';
import LandingPage from './component/LandingPage';

const App = () => {
  const[showHeroSection,setShowHeroSection] = useState(false);
  console.log(showHeroSection)
  return (
    <div>
      <IntroAnimation setShowHeroSection={setShowHeroSection}/>
      <div className='overflow-hidden'>
      {showHeroSection && <LandingPage showHeroSection={showHeroSection}/>}
      </div>
      
    </div>
  )
}

export default App