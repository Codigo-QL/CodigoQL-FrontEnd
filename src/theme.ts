import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        background: { value: "#F0F0F0" },
        primaryButton: { value: "#050F1A" },
        primaryText: { value: "#F0F0F0" },
        secondaryBackground: { value: "#62A6F5" },
        greenHighlight: { value: "#48D4B3" }
      },
      fonts: {
        body: { value: "'Oswald', sans-serif" },
        heading: { value: "'Oswald', sans-serif" },
        mono: { value: "monospace" }
      }
    },
  },
  globalCss: {
    body: {
      bg: "background",
    },
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#050F1A",
      borderRadius: "6px",
      border: "2px solid transparent",
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#62A6F5",
      borderRadius: "6px",
      border: "2px solid transparent",
      backgroundClip: "content-box",
    },
  }
})

export default system
