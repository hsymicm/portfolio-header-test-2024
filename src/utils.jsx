import { clsx } from "clsx";
import { useState, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";
 
export function cn(...args) {
  return twMerge(clsx(args));
}

export function generateRandomNumber(num) {
  const randomNumbers = [];

  for (let i = 0; i < num; i++) {
    const randomNumber = Math.random() * 360;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}