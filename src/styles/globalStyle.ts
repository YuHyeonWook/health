import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardRegular');
    src: url('../assets/fonts/PretendardRegular.woff') format('truetype');
    font-weight: 400;
    font-style: normal;
  } 

  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardMedium');
    src: url('../assets/fonts/PretendardMedium.woff') format('truetype');
    font-weight: 500;
    font-style: normal;
  } 

  @font-face {
    font-family: 'Pretendard';
    src: local('../assets/fonts/PretendardSemiBold.woff');
    src: url('../assets/fonts/PretendardSemiBold.woff') format('truetype');
    font-weight: 600;
    font-style: normal;
  } 

  @font-face {
    font-family: 'Pretendard';
    src: local('PretendardBold');
    src: url('../assets/fonts/PretendardBold.woff') format('truetype');
    font-weight: 700;
    font-style: normal;
  } 

  :root {
    --color-green: #4cd964
    --color-green-light: #f9fffa;
    --color-gray: #969696;
    --color-gray-light: #c7c7c7;
    --color-gray-dark: #5e5e5e;
    --color-black: #171717;
    --color-white: #ffffff;

    --border-gray: 1px solid #c7c7c7; 

    font-size: 10px;
  }

  * {
      margin: 0;
      padding: 0;
      font-family: "Pretendard", "Helvetica", "Arial", sans-serif;
      box-sizing: border-box;
  }
  
  body {
    font-family: "Pretendard", "Helvetica", "Arial", sans-serif;
    font-size: 1.6rem;
    line-height: 1.25;
    color: var(--color-black);
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
`;

export default GlobalStyle;
