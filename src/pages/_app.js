import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NetworkMessageWrapper from '../component/NetworkMessageWrapper'
import AuthProvider from '../component/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <NetworkMessageWrapper>
            <Component {...pageProps} />
          </NetworkMessageWrapper>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
