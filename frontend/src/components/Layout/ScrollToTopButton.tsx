import React,{ useState, useEffect } from 'react'
import {
    Button
  } from "@mui/material";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY
      const isMobile = /Mobi|Android/i.test(navigator.userAgent)
      
      if (isMobile && documentHeight >= screenHeight * 1) {
        if (scrollPosition >= documentHeight - screenHeight) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div>
      <div style={hideWhenVisible}>
      </div>
      <div style={{ ...showWhenVisible, position: 'relative', width: '100%', height: '100vh' }}>
        <Button
        variant="contained"
        style={{  
          position: 'absolute', 
          bottom: '20px', 
          right: '20px',
          zIndex: 99,
          }} 
        onClick={() => window.scrollTo({ 
          top: 0, 
          behavior: "smooth" 
          })}
          >
            Sivun alkuun
          </Button>
      </div>
    </div>
  )
}

export default ScrollToTopButton