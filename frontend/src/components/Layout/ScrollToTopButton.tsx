import { useState, useEffect } from 'react'
import { Button } from "@mui/material"

const ScrollToTopButton = () => {
  const [isVisible, setVisible] = useState(false)

useEffect(() => { 
    const handleScroll = () => {
        const screenHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const isMobile = /Mobi|Android/i.test(navigator.userAgent)
        if (isMobile && documentHeight >= screenHeight * 4) {
            const scrollPosition = window.scrollY
            setVisible(scrollPosition > window.innerHeight / 2)
        }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
}, [])

  return (
    <div>
      <div style={{ position: 'fixed', bottom: '60px', right: '20px', zIndex: 99 }}>
        {isVisible && (
          <Button 
          variant="contained" 
          style = {{ backgroundColor: '#63c8cc'}} 
          onClick={() => window.scrollTo({ 
            top: 0, 
            behavior: "smooth" 
            })}>
            Sivun alkuun
          </Button>
          )}
      </div>
    </div>
  )
}

export default ScrollToTopButton