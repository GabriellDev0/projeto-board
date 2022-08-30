import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import '../styles/global.scss';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';


const initialOptions = {
    "client-id": "AbPtzRKUfDzICRrekrBWEqQvMcdBk-kEWdOG_x58Sa7nQb8f8s-vqaJjT-Fi7ztZ2Vdw3qwR0sx5Qg4e",
    currency: "BRL",
    intent: "capture"
}


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
