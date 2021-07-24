import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { ColorStyles } from '../styles/colors';


const GlobalStyle = createGlobalStyle<Record<string, any>>`
  ${ColorStyles}
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
