import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import "./global.css";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`${css`
  ${reset};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;

    @media screen and (max-width: 500px) {
      font-size: 52.5%;
    }
  }

  body {
    font-family: "pretendard";
    background-color: var(--bg-color);
  }

  button {
    border: none;
    font-family: inherit;
    cursor: pointer;
  }

  input {
    border: none;
    font-family: inherit;
  }
`}
`;

export default GlobalStyle;
