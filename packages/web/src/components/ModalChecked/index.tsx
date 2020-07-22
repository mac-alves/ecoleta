import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

import { Container, Content, Title } from './styles';

interface Props {
    title: string;
    link?: string;
}

const ModalChecked: React.FC<Props> = ({ title, link = '/' }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(link);
    }

    return (
        <Container onClick={handleClick}>
            <Content>
                <FiCheckCircle size={50} color="#34CB79" />
                <Title>{title}</Title>
            </Content>
        </Container>
    );
}

export default ModalChecked;