import styled from 'styled-components';
import { Device as Size } from '../../config/SizeWindow';

export const Container = styled.header`
    margin-top: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    
    img {
        max-height: 44px;
    }

    @media(${Size.tablet}) {
        margin-top: 25px;
        flex-direction: column;
    }
`;
