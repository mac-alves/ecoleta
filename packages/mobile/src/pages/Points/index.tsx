import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather as Icon} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { api } from '../../services/api';
import * as Location from 'expo-location';
import styles from './styles';

// import { Container } from './styles';
interface Item {
    id: number,
    name: string,
    image_url: string
}

interface Point {
    id: number,
    image: string,
    image_url: string,
    name: string,
    latitude: number,
    longitude: number,
}

interface Params {
    uf: string;
    city: string;
}

const Points: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Params;

    const [ items, setItems ] = useState<Item[]>([]);
    const [ points, setPoints ] = useState<Point[]>([]);
    const [ selectedItems, setSelectedItems ] = useState<number[]>([]);
    const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);

    const handleNavigationToBack = () => {
        navigation.goBack();
    }

    const handleNavigationToDetail = (idPoint: number) => {
        navigation.navigate('Detail', { point_id: idPoint });
    }

    const getItems = async () => {
        const response = await api.get('items');
        setItems(response.data);
    }

    const getPoints = async () => {
        const response = await api.get('points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems
            }
        });

        setPoints(response.data);
    }

    const handleSelectItem = (idItem: number) => {
        const item = selectedItems.findIndex(item => item === idItem);

        if (item >= 0){
            setSelectedItems(items => items.filter(item => item !== idItem))

        } else {
            setSelectedItems([...selectedItems, idItem])
        }
    }

    const loadPosition = async () => {
        const { status } = await Location.requestPermissionsAsync();

        if (!status){
            Alert.alert('Ops...', 'Precisamos de permissão para obter a localização.');
            return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        setInitialPosition([latitude, longitude]);
    }

    useEffect(() => {
        loadPosition();
        getItems();
        getPoints();
    }, []);

    useEffect(() => {
        getPoints();
    }, [selectedItems]);

    return (
        <>
            <View style={styles.container} >
                <TouchableOpacity onPress={handleNavigationToBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Bem vindo.
                </Text>
                <Text style={styles.description}>
                    Encontre no mapa um ponto de coleta.
                </Text>

                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView 
                            style={styles.map} 
                            initialRegion={{
                                latitude: -2.5004548,
                                longitude: -44.2763225,
                                // latitude: initialPosition[0],
                                // longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {points.map(point => (
                                <Marker 
                                    key={String(point.id)}
                                    style={styles.mapMarker}
                                    onPress={() => handleNavigationToDetail(point.id)}
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }} 
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image 
                                            style={styles.mapMarkerImage} 
                                            source={{uri: point.image_url}} 
                                        />
                                        <Text style={styles.mapMarkerTitle}>
                                            {point.name}
                                        </Text>
                                    </View>
                                </Marker>
                            ))}
                            
                        </MapView>
                    )}
                </View>

            </View>
            <View style={styles.itemsContainer} >
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }} >
                    {items.map(item => (
                        <TouchableOpacity 
                            key={String(item.id)} 
                            style={[
                                styles.item, 
                                selectedItems.includes(item.id) ? styles.selectedItem : {} 
                            ]} 
                            onPress={() => handleSelectItem(item.id)}
                            activeOpacity={0.6}
                        >
                            <SvgUri 
                                width={42} 
                                height={42} 
                                uri={item.image_url} 
                            />
                            <Text style={styles.itemTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

export default Points;