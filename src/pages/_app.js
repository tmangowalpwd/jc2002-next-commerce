import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NetworkMessageWrapper from '../component/NetworkMessageWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <NetworkMessageWrapper>
          <Component {...pageProps} />
        </NetworkMessageWrapper>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
