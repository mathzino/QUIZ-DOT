import "@/styles/globals.css";
import "@/styles/style.css";
import type { AppProps } from "next/app";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
