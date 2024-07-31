import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/provider'
import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/theme-utils';
import { AuthContextProvider } from './Context/AuthContext'
import { PostContextProvider } from './Context/PostContext';
import { MessageContextProvider } from './Context/MessageContext';



const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    }
  })
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const color = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  }
}

const theme = extendTheme({ config, styles, color });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AuthContextProvider>
      <PostContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
  // </React.StrictMode>
);


