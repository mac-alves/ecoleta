import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon} from '@expo/vector-icons';
import { pickerSelectStyles, styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { axios } from '../../services/api';
import RNPickerSelect from 'react-native-picker-select';

interface UF {
    label: string;
    value: number;
}

interface City {
    label: string;
    value: number;
}

const Home: React.FC = () => {
    const navigation = useNavigation();
    const [ ufs, setUfs ] = useState<UF[]>([{label: '', value: 0}]);
    const [ selectedUf, setSelectedUf ] = useState<number>(0);
    const [ cities, setCities ] = useState<City[]>([{label: 'Selecione um estado primeiro', value: 0}]);
    const [ selectedCity, setSelectedCity ] = useState<string>();

    const handleNavigationToPoints = () => {
        navigation.navigate('Points', {
            uf: ufs.find(uf => uf.value === selectedUf)?.label, 
            city: selectedCity
        });
    }

    const getUfs = useCallback(async () => {
        const ufs = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');    
        setUfs(ufs.data.map((uf: any) => {
          return {
            value: uf.id,
            label: uf.sigla
          }
        }));    
    }, []);

    const getCity = useCallback(async () => {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);
    
        setCities(response.data.map((city: any) => {
            return {
                value: city.nome,
                label: city.nome
            }
        }));
    }, [selectedUf]);

    useEffect(() => {
        getUfs();
    }, [getUfs]);

    useEffect(() => {
        if (selectedUf !== 0){
            getCity();
        }    
    }, [getCity, selectedUf]);

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground 
                source={require('../../assets/img/home-background.png')} 
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
                >
                <View style={styles.main} >
                    <Image source={require('../../assets/img/logo.png')} />
                    <View>
                        <Text style={styles.title} >Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description} >Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Estado...',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        items={ufs}
                        onValueChange={setSelectedUf}
                        style={pickerSelectStyles}
                        value={selectedUf}
                        useNativeAndroidPickerStyle={false}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Cidade...',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        items={cities}
                        onValueChange={setSelectedCity}
                        style={pickerSelectStyles}
                        value={selectedCity}
                        useNativeAndroidPickerStyle={false}
                        disabled={(selectedUf === 0) ? true : false}
                    />
                    <RectButton style={styles.button} onPress={handleNavigationToPoints} >
                        <View style={styles.buttonIcon} > 
                            <Icon name="arrow-right" color="#fff" size={24} />
                        </View>
                        <Text style={styles.buttonText} >
                            Entrar
                        </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Home;