import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NetworkMessageWrapper from '../component/NetworkMessageWrapper'
import AuthProvider from '../component/AuthProvider'
import Navbar from '../component/Navbar'
import GoogleAnalytics from '../component/GoogleAnalytics'
import * as gtag from "../lib/gtag"
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <ChakraProvider>
        <NetworkMessageWrapper>
          <AuthProvider>
            <GoogleAnalytics />
            <Navbar />
            <Component {...pageProps} />
          </AuthProvider>
        </NetworkMessageWrapper>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
