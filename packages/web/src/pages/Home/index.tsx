import React from 'react';
import './Home.css';
import { FiLogIn } from 'react-icons/fi';
import { Container } from './styles';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';

const Home: React.FC = () => {
    return (
        <Container id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem prontos de coleta de forma eficiente.</p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </Container>
    );
}

export default Home;