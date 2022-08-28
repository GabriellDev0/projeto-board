import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import '../styles/global.scss';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';


const initialOptions = {
    "client-id": "AV0_Tv_bdpXIVM79O9oYZNh1JfBOjpDKuJZY2DiuS_XIWNVVyNy_W4ZKkEidcEnLGT459yMk-9pv7M14",
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
