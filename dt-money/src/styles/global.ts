import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    background-color: ${(props) => props.theme['green-500']};
  }

  body {
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }
`;
