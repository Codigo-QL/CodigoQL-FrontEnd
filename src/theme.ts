import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        background: { value: "#F0F0F0" },
        primaryButton: { value: "#050F1A" },
        primaryText: { value: "#F0F0F0" },
        secondaryBackground: { value: "#62A6F5" },
      },
    },
  },
})

export default system
