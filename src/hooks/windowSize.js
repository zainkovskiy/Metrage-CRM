import React, { useState, useEffect } from "react"

const dimensionStart = () => {
  return window.innerWidth;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(dimensionStart())

  const updateDimension = () => {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [])

  return windowSize;
}