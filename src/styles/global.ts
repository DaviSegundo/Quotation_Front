import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root{
        --white: #FFFFFF;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background: var(--white);
        -webkit-font-smoothing: antialiased;
    }

    html{
        @media(min-width: 1080px){
            font-size: 93.75%;
        }
        @media(min-width: 720px){
            font-size: 87.5%;
        }
    }

    button{
        cursor: pointer;
    }

    [disabled]{
        cursor: not-allowed;
        opacity: 0.6;
    }
    
`