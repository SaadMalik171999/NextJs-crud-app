import { store } from '@/redux/store';
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'


const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  )
}
