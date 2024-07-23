import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import ContextProvider from './components/context/ContextProvider.jsx'

const breakpoints = {
  base: '0em',
  xs: '20rem',
  sm: '30em',
  md: '40em',
  lg: '48em',
  xl: '62em',
  '2xl': '80em',
  '3xl': '96em',
}

const theme = extendTheme({ breakpoints })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
)