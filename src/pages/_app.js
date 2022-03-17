import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NetworkMessageWrapper from '../component/NetworkMessageWrapper'
import AuthProvider from '../component/AuthProvider'
import Navbar from '../component/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <NetworkMessageWrapper>
          <AuthProvider>
            <Navbar />
            <Component {...pageProps} />
          </AuthProvider>
        </NetworkMessageWrapper>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
