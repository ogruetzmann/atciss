import { useTheme } from "@emotion/react"
import type { Theme } from "theme-ui"

export type AtcissTheme = Theme & {
  colors: {
    text: string
    background: string
    primary: string
    darkshadow: string
    brightshadow: string
  }
}

export const useAppTheme = useTheme as () => AtcissTheme

export const theme: AtcissTheme = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#0082b3",
    darkshadow: "#003e59",
    brightshadow: "#90c6da",
    green: "#007711",
    modes: {
      dark: {
        text: "#fff",
        background: "#222",
        primary: "#90c6da",
        shadow: "#003e59",
        brightshadow: "#a0e6fa",
        green: "#33ff99",
      },
    },
  },
  fonts: {
    body: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    heading:
      "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    monospace:
      "'Source Code Pro', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  text: {
    atisXL: {
      color: "primary",
      fontSize: "6",
      fontWeight: "bold",
    },
    atisL: {
      color: "primary",
      fontSize: "5",
    },
    label: {
      fontWeight: "bold",
      fontFamily:
        "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    primary: {
      color: "primary",
    },
    mapAd: {
      color: "primary",
      fontSize: "3",
      fontWeight: "bold",
    },
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
    },
  },
  space: ["0px", "4px", "8px", "16px", "32px", "48px", "64px"],
}
