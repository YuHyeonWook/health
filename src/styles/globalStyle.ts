import { createGlobalStyle } from 'styled-components';
import { device } from './media';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardRegular'),
          url('@/assets/fonts/PretendardRegular.woff') format('font-woff');
    font-weight: 400;
    font-style: normal;
  } 

  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardMedium'),
          url('@/assets/fonts/PretendardMedium.woff') format('font-woff');
    font-weight: 500;
    font-style: normal;
  } 

  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardSemiBold'),
          url('@/assets/fonts/PretendardSemiBold.woff') format('font-woff');
    font-weight: 600;
    font-style: normal;
  } 

  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardBold'),
        url('@/assets/fonts/PretendardBold.woff') format('font-woff');
    font-weight: 700;
    font-style: normal;
  }

  :root {
    --color-primary: #4cd964;
    --color-primary-light: #f9fffa;
    --color-primary-dark: #30ac45;
    --color-gray: #969696;
    --color-gray-light: #c7c7c7;
    --color-gray-dark: #5e5e5e;
    --color-black: #171717;
    --color-white: #ffffff;

    --chip-red: #b91c1c;
    --chip-red-bg: #fee2e2;
    --chip-yellow: #d97706;
    --chip-yellow-bg: #fef3c7;
    --chip-green: #047857;
    --chip-green-bg: #d1fae5;
    --chip-blue: #1d4ed8;
    --chip-blue-bg: #dbeafe;

    --border-primary: 1px solid #4cd964; 
    --border-gray: 1px solid #c7c7c7; 

    font-size: 10px;

    @media ${device.tablet} {
      font-size: 9px;
    }
  }

  * {
      margin: 0;
      padding: 0;
      font-family: "Pretendard", "Helvetica", "Arial", sans-serif;
      box-sizing: border-box;
  }
  
  body {
    min-width: 320px;
    font-family: "Pretendard", "Helvetica", "Arial", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.25;
    color: var(--color-black);
    background-color: var(--color-primary-light);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button,
  input,
  select,
  textarea {
    font-size: 1.6rem;
    background-color: transparent;
    border: 0;
    border-radius: 6px;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

export default GlobalStyle;
