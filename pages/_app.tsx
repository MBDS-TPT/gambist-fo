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
import { ConfigService } from '../services/config/config.service';
import { getBaseUrl } from '../services/basic.service';


const GlobalStyle = createGlobalStyle<Record<string, any>>`
  ${ColorStyles}
`;

function MyApp({ Component, pageProps }: AppProps) {
  
  const [userInfos, setUserInfos] = useState();
  const [currency, setCurrency] = useState("$");
  const [mimimumBetValue, setMinimumBetValue] = useState(1);
  const [maximumBetValue, setMaximumBetValue] = useState(10000);
    
  useEffect(() => {
    ConfigService.getCurrency().then((res) => { 
      setCurrency(res);
    });
    ConfigService.getMaximumBetValue().then((res) => {
      setMaximumBetValue(res);
    })
    ConfigService.getMinimumBetValue().then((res) => {
      setMinimumBetValue(res);
    })
    AuthService.refreshUserInfo().then((res) => {
      setUserInfos(AuthService.getUserInfosFromLS());
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
      <UIProvider 
        baseUrl={getBaseUrl()} 
        currency={currency} 
        maximumBet={maximumBetValue} 
        minimumBet={mimimumBetValue} 
        userInfo={userInfos} >
        <GlobalStyle/>
        <Component {...pageProps} />
      </UIProvider>
  );
}
export default MyApp
