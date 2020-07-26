import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { Container, P, Image } from './styles';

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