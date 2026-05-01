import { Global, css } from '@emotion/react'
import { colorValues, theme } from './theme'

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        :root {
          --white-color: ${colorValues.white};
          --black-color: ${colorValues.black};
          --grey-color: ${colorValues.grey};
          --background-color: ${colorValues.background};
          --pink-color: ${colorValues.pink};
          --surface-color: ${colorValues.surface};
          --surface-soft-color: ${colorValues.surfaceSoft};
          --surface-muted-color: ${colorValues.surfaceMuted};
          --shadow-light: ${colorValues.shadowLight};
          --shadow-medium: ${colorValues.shadowMedium};
          --shadow-dark: ${colorValues.shadowDark};
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          min-width: ${theme.size.minViewport};
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${theme.color.pink};
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }
      `}
    />
  )
}
