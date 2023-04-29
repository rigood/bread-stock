import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Pretendard from "./fonts/Pretendard-Regular.woff";
import Pretendard2 from "./fonts/Pretendard-Regular.woff2";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
    font-family: "pretendard";
    src: url(${Pretendard2}) format('woff2'), url(${Pretendard}) format('woff');
}

*{
    box-sizing: border-box;
}

body{
    font-family: 'pretendard';
    background-color: #F8F0E5;
}
`;

export default GlobalStyle;
