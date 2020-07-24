import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

const Container = styled.div`
    height: 300px;
    background: #E1FAEC;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 48px;
    outline: 0;
`;

const P = styled.p`
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed #4ECB79;
  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;

    svg {
        color: #4ECB79;
        width: 24px;
        height: 24px;
        margin-bottom: 8px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%; 
    object-fit: cover;
`;

interface Props {
    onFileUpload: (file: File) => void
}

const DropZone: React.FC<Props> = ({ onFileUpload }) => {
    const [ fileUrl, setFileUrl ] = useState('');
    
    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        const urlFile = URL.createObjectURL(file);
        setFileUrl(urlFile);
        onFileUpload(file);
    }, [onFileUpload])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: 'image/*', onDrop});
  
    return (
        <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
            <input {...getInputProps()} accept="image/*" />
            
            { fileUrl 
                ? <Image src={fileUrl} alt="Point image"/> 
                : (
                    <P>
                        <FiUpload />
                        Imagem do estabelecimento
                    </P>
                ) }
        </Container>
    );
}
export default DropZone;