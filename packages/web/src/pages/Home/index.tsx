import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Main, Title, Description, Link } from './styles';
import Header from '../../components/Header';

const Home: React.FC = () => {
    return (
        <Container id="page-home">
            <Content className="content">
                <Header />
                <Main>
                    <Title>Seu marketplace de coleta de resíduos.</Title>
                    <Description>Ajudamos pessoas a encontrarem prontos de coleta de forma eficiente.</Description>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </Main>
            </Content>
        </Container>
    );
}

export default Home;