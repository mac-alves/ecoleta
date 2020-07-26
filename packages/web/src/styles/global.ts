import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    body {
        background: #F0F0F5;
        -webkit-font-smoothing: antialiased;
        color: ${props => props.theme.colors.text}
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.colors.title};
        font-family: Ubuntu;
    }
`;