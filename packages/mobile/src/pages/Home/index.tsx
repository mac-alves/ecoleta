import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon} from '@expo/vector-icons';
import { Container } from './styles';
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
    const [ selectedUf, setSelectedUf ] = useState<string>('0');
    const [ cities, setCities ] = useState<City[]>([{label: 'Selecione um estado primeiro', value: 0}]);
    const [ selectedCity, setSelectedCity ] = useState<string>();

    const handleNavigationToPoints = () => {
        navigation.navigate('Points', {
            uf: selectedUf, city: selectedCity
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
        if (selectedUf !== '0'){
            getCity();
        }    
    }, [getCity, selectedUf]);

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Container 
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
                        disabled={(selectedUf === '0') ? true : false}
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
            </Container>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
    inputAndroid: {
    //   fontSize: 16,
    //   paddingHorizontal: 10,
    //   paddingVertical: 8,
    //   borderWidth: 0.5,
    //   borderColor: 'purple',
    //   borderRadius: 8,
    //   color: 'black',
    //   paddingRight: 30, // to ensure the text is never behind the icon
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
});

export default Home;