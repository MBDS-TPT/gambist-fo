import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { ColorStyles } from '../styles/colors';
import Config from '../config/config.json';
import { UIContextInterface, UIProvider } from '../components/ui-context/UIContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthService } from '../services/auth/auth.service';
import { ConfigService } from '../services/config/config.service';


const GlobalStyle = createGlobalStyle<Record<string, any>>`
  ${ColorStyles}
`;

function MyApp({ Component, pageProps }: AppProps) {
  
  const [userInfos, setUserInfos] = useState();
  const [siteConfig, setSiteConfig] = useState<UIContextInterface>();
  
  useEffect(() => {
    setUserInfos(AuthService.getUserInfosFromLS());
  }, []);

  return (
    <UIProvider baseUrl="" currency={Config.Currency} userInfo={userInfos}>
      <GlobalStyle/>
      <Component {...pageProps} />
    </UIProvider>
  );
}
export default MyApp
