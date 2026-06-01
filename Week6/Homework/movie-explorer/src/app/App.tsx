import { queryClient } from '@shared/api/query-client'
import { GlobalStyle } from '@shared/styles/GlobalStyle'
import { theme } from '@shared/styles/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { router } from '@routes/router'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
