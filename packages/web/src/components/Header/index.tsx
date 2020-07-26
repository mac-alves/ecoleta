import React from 'react';
import { Container } from './styles';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
interface HeaderProps {
    title?: string
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <Container>
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
            {children}
        </Container>
    );
}

export default Header;