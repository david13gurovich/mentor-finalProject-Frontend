import '../styles/global.css'
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {wrapper} from '/modules/store';
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

function App({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore();
  useEffect(() => {
    // This is to force the locale on initial page load based on the router locale
    // You can modify this behavior based on your requirements
    if (router.locale) {
      document.documentElement.lang = router.locale;
    }
  }, [router.locale]);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(appWithTranslation(App));