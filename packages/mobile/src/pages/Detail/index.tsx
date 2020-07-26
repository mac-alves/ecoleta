import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { AppLoading } from 'expo';
import * as MailComposer from 'expo-mail-composer';
import styles from './styles';

interface Params {
    point_id: number;
}

interface Data {
    point: {
        id: number,
        image: string,
        image_url: string;
        name: string,
        email: string,
        whatsapp: string,
        latitude: number,
        longitude: number,
        city: string,
        uf: string,
    },
    items: {
        id: number,
        image: string,
        title: string,
        point_id: number,
        item_id: number
    }[],
}

const Detail: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Params;

    const [ data, setData ] = useState<Data>({} as Data);

    const handleNavigationToBack = () => {
        navigation.goBack();
    }

    const getData = async () => {
        const response = await api.get(`points/${routeParams.point_id}`);
        setData(response.data);
    }

    const handleComposeMail = () => {
        MailComposer.composeAsync({
           subject: 'Interesse na coleta de resíduos',
           recipients: [data.point.email],
        })
    }

    const handleComposeWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`)
    }

    useEffect(() => {
        getData();
    }, []);

    if (!data.point){
        return <AppLoading />
    }

    return (
        <SafeAreaView style={{flex: 1}} >
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationToBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image 
                    style={styles.pointImage} 
                    source={{uri: data.point.image_url}}  />

                <Text style={styles.pointName} >{data.point.name}</Text>
                <Text style={styles.pointItems} >{data.items.map(item => item.title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle} >Endereço</Text>
                    <Text style={styles.addressContent} >{data.point.city} / {data.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleComposeWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#fff" />
                    <Text style={styles.buttonText} >Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color="#fff" />
                    <Text style={styles.buttonText} >E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
}

export default Detail;