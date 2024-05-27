import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
  --color-yellow: #FCD118;
  font-size: 16px;

}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body, #root {
    font-family: "Helvetica", "Arial", sans-serif;
  }

`;
export default GlobalStyle;
