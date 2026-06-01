import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background: ${({ theme }) => theme.colors.background};
  }

  body {
    min-width: 320px;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    font-family:
      Inter, Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button,
  input,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  #root {
    min-height: 100svh;
  }
`
