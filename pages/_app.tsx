import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { ColorStyles } from '../styles/colors';
import Config from '../config/config.json';
import { UIProvider } from '../components/ui-context/UIContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthService } from '../services/auth/auth.service';


const GlobalStyle = createGlobalStyle<Record<string, any>>`
  ${ColorStyles}
`;

function MyApp({ Component, pageProps }: AppProps) {
  
  const [userInfos, setUserInfos] = useState();
  
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
