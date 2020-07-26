import styled from 'styled-components';
import { Link as Navigation } from 'react-router-dom';
import Img from '../../assets/img/home-background.svg'
import { Device as Size } from '../../config/SizeWindow';

export const Container = styled.div`
    height: 100vh;
    background: url(${Img}) no-repeat 700px bottom;
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media(${Size.tablet}) {
        align-items: center;
        text-align: center;
    }
`;

export const Main = styled.div`
    flex: 1;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media(${Size.tablet}) {
        align-items: center;
    }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.colors.title};

    @media(${Size.tablet}) {
        font-size: 42px;
    }
`;

export const Description = styled.p`
    font-size: 18px;
    margin-top: 24px;
    line-height: 38px;

    @media(${Size.tablet}) {
        font-size: 24px;
    }
`;

export const Link = styled(Navigation)`
    width: 100%;
    max-width: 360px;
    height: 72px;
    background: ${props => props.theme.colors.primary};
    border-radius: 8px;
    text-decoration: none;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 40px;

    span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 72px;
        height: 72px;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;

        svg {
            color: #FFF;
            width: 20px;
            height: 20px;
        }
    }

    strong {
        flex: 1;
        text-align: center;
        color: #FFF;
    }

    &:hover {
        background: #2FB86E;
    }
`;