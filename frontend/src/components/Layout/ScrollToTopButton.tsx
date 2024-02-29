import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ScrollToTopButton = () => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isMobile = /Mobi|Android/i.test(navigator.userAgent)
      if (isMobile && documentHeight >= screenHeight * 1) {
        const scrollPosition = window.scrollY
        setVisible(scrollPosition > window.innerHeight / 2)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div>
      <div
        style={{ position: "fixed", bottom: "60px", right: "20px", zIndex: 99, opacity: 0.8 }}
      >
        {isVisible && (
          <Button
            variant="contained"
            style={{ backgroundColor: "#f5be3f" }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <KeyboardArrowUpIcon  />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ScrollToTopButton
