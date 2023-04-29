import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Pretendard from "./fonts/Pretendard-Regular.woff";
import Pretendard2 from "./fonts/Pretendard-Regular.woff2";
import ddangs from "./fonts/ddangs.woff";
import ddangs2 from "./fonts/ddangs2.woff2";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
    font-family: "pretendard";
    src: url(${Pretendard2}) format('woff2'), url(${Pretendard}) format('woff');
}

@font-face {
    font-family: "ddangs";
    src: url(${ddangs2}) format('woff2'), url(${ddangs}) format('woff');
}

*{
    box-sizing: border-box;
}

html{
    font-size: 62.5%;
}

@media screen and (max-width: 500px) {
        html{
            font-size: 52.5%;        
        }
    }

body{
    font-family: 'pretendard';
    background-color: #F8F0E5;
}
`;

export default GlobalStyle;
