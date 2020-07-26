import styled from 'styled-components';
import { Link as Navigation } from 'react-router-dom';
import { Device as Size } from '../../config/SizeWindow';

export const Container = styled.div`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
`;

export const Link = styled(Navigation)`
    color: ${props => props.theme.colors.title};
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
        margin-right: 16px;
        color: ${props => props.theme.colors.primary};
    }

    @media(${Size.tablet}) { 
        position: absolute;
        left: 25px;
        top: 15px;

        i {
            display: none;
        }

        svg {
            transform: scale(1.5);
        }
    }
`; 

export const Form = styled.form`
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #FFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    @media(${Size.tablet}) { 
        margin: 20px auto;
        padding: 20px;
    }
`;

export const Title = styled.h1`
    font-size: 36px;

    @media(${Size.tablet}) { 
        text-align: center;
    }
`;

export const Fieldset = styled.fieldset`
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;

    @media(${Size.tablet}) { 
        margin-top: 30px;
    }
`;

export const Legend = styled.legend`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h2 {
        font-size: 24px;
    }

    span {
        font-size: 14px;
        font-weight: normal;
        color: ${props => props.theme.colors.text};
    }

    @media(${Size.tablet}) { 
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        span {
            margin-top: 10px;
        }
    }
`;

export const MapContainer = styled.div`
    & .field-check {
        flex-direction: row;
        align-items: center;
    }

    & .field-check input[type=checkbox] {
        background: #F0F0F5;
    }

    & .field-check label {
        margin: 0 0 0 8px;
    }

    & .leaflet-container {
        width: 100%;
        height: 350px;
        border-radius: 8px;
        margin-bottom: 24px;
    }
`;

export const FielGroup = styled.div`
    flex: 1;
    display: flex;

    @media(${Size.tablet}) { 
        flex-direction: column;
    }
`;

export const Field = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    :disabled {
        cursor: not-allowed;
    }

    & + & {
        margin-left: 24px;
    }

    @media(${Size.tablet}) { 
        & + & {
            margin-left: 0px;
        }
    }
`;

export const Input = styled.input`
    flex: 1;
    background: #F0F0F5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;

    &::placeholder {
        color: #A0A0B2;
    }

    & + & {
        margin-left: 24px;
    }
`;

export const Select = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: #F0F0F5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;
`;

export const Label = styled.label`
    font-size: 14px;
    margin-bottom: 8px;
`;

export const Button = styled.button`
    width: 260px;
    height: 56px;
    background: ${props => props.theme.colors.primary};
    border-radius: 8px;
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
        background: #2FB86E;
    }
`;

export const ItemsGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    list-style: none;

    @media(${Size.tablet}) { 
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const Item = styled.ul`
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;

    span {
        flex: 1;
        margin-top: 12px;
        display: flex;
        align-items: center;
        color: var(--title-color)
    }

    &.selected {
        background: #E1FAEC;
        border: 2px solid #34CB79;
    }
`;