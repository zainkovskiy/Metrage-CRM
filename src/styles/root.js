import { createGlobalStyle } from 'styled-components';
import CeraCY_TTF from '../public/fonts/CeraCYRegular.ttf';
import CeraCY_WOFF from '../public/fonts/CeraCYRegular.woff';
import CeraCY_WOFF2 from '../public/fonts/CeraCYRegular.woff2';
import CeraCYBold_TTF from '../public/fonts/CeraCYBold.ttf';
import CeraCYBold_WOFF from '../public/fonts/CeraCYBold.woff';
import CeraCYBold_WOFF2 from '../public/fonts/CeraCYBold.woff2';

//Новый год
// import wall1Url from '../public/Wall_1.jpg';
// import wall2Url from '../public/Wall_2.jpg';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html{
    overflow: hidden;
  }
  @font-face {
    font-family: 'CeraCY';
    src: local('CeraCY'), local('CeraCY'),
    url(${CeraCY_TTF}) format('ttf'),
    url(${CeraCY_WOFF2}) format('woff2'),
    url(${CeraCY_WOFF}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'CeraCYBold';
    src: local('CeraCYBold'), local('CeraCYBold'),
    url(${CeraCYBold_TTF}) format('ttf'),
    url(${CeraCYBold_WOFF}) format('woff2'),
    url(${CeraCYBold_WOFF2}) format('woff');
    font-weight: 700;
    font-style: normal;
  }
  #root{
    height: 100dvh;
    min-height: ${document.documentElement.clientHeight}px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* //Новый год
    background-image: url(${wall1Url});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
  }
  .react-dadata__input:focus{
    box-shadow: none !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
`;
export const rootTheme = {
  color: {
    primary: '#85009e',
    // secondary: '#ebebeb',
    secondary: 'rgb(249 245 245)',
    white: '#ffffff',
  },
  font: {
    family: 'CeraCY, sans-serif',
    familyBold: 'CeraCYBold, sans-serif',
  },
};
export const darkTheme = {
  color: {
    primary: '#fff',
    // secondary: '#ebebeb',
    secondary: 'rgb(73 73 73)',
    white: '#ffffff',
  },
  font: {
    family: 'CeraCY, sans-serif',
    familyBold: 'CeraCYBold, sans-serif',
  },
};
