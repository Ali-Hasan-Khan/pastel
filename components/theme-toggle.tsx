"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import styled from 'styled-components'

const StyledWrapper = styled.div`
  .love-heart:before, #switch {
    display: none;
  }

  .love-heart, .love-heart::after {
    border-color: hsl(231deg 28% 86%);
    border: 1px solid;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    width: 10px;
    height: 8px;
    border-bottom: 0;
  }

  .round {
    position: absolute;
    z-index: 1;
    width: 8px;
    height: 8px;
    background: #9f7fc0;
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 4px 0px;
    border-radius: 100%;
    left: 0px;
    bottom: -1px;
    transition: all .5s ease;
    animation: check-animation2 .5s forwards;
  }

  input:checked + label .round {
    transform: translate(0px, 0px);
    animation: check-animation .5s forwards;
    background-color: #9f7fc0;
  }

  @keyframes check-animation {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, 7px);
    }
    100% {
      transform: translate(7px, 7px);
    }
  }

  @keyframes check-animation2 {
    0% {
      transform: translate(7px, 7px);
    }
    50% {
      transform: translate(0px, 7px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  .love-heart {
    box-sizing: border-box;
    position: relative;
    transform: rotate(-45deg) translate(-50%, -20px) scale(1.5);
    display: block;
    border-color: hsl(231deg 28% 86%);
    cursor: pointer;
    top: 0;
    transition: all 0.3s ease;
  }

  /* Dark theme styles */
  .dark .love-heart, .dark .love-heart::after, .dark .love-heart .bottom {
    border-color: #9f7fc0;
  }

  .dark .round {
    background: #9f7fc0;
    box-shadow: rgb(255 255 255 / 20%) 0px 0px 4px 0px;
  }

  input:checked + .love-heart, input:checked + .love-heart::after, input:checked + .love-heart .bottom {
    border-color: #9f7fc0;
    box-shadow: inset 6px -5px 0px 2px #d8c5f0;
  }

  .love-heart::after, .love-heart .bottom {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-color: inherit;
  }

  .love-heart::after {
    right: -9px;
    transform: rotate(90deg);
    top: 7px;
  }

  .love-heart .bottom {
    width: 11px;
    height: 11px;
    border-left: 1px solid;
    border-bottom: 1px solid;
    border-color: inherit;
    left: -1px;
    top: 5px;
    border-radius: 0px 0px 0px 5px;
  }

  .theme-toggle-container {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .theme-toggle-container:hover {
    background: transparent;
  }

  .dark .theme-toggle-container:hover {
    background: transparent;
  }

  .love {
    position: relative;
    width: 40px;
    height: 45px;
  }
`

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg opacity-0">
        <div className="w-full h-full" />
      </div>
    )
  }

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <StyledWrapper>
      <div className="theme-toggle-container pl-4">
        <div className="love">
          <input 
            id="theme-switch" 
            type="checkbox" 
            checked={theme === "dark"}
            onChange={handleToggle}
            className="opacity-0"
          />
          <label className="love-heart" htmlFor="theme-switch">
            <i className="left" />
            <i className="right" />
            <i className="bottom" />
            <div className="round" />
          </label>
        </div>
      </div>
    </StyledWrapper>
  )
}
