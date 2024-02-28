import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';

const Clima = () => {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);
    {/*Mi api key:89918159aeee4e8899f151532231110*/}
    useEffect(() => {
        fetch('http://api.weatherapi.com/v1/forecast.json?key=89918159aeee4e8899f151532231110&q=huejutla&days=3&aqi=no&alerts=no&lang=es')
            .then(res => res.json())
            .then(obj => {
                setData(obj);
                setLoad(true);
            })
            .catch(err => Alert.alert('Error inesperado : ' + err));
    }, []);

    const LoadingScreen = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={'darkblue'} />
                <Text>Cargando datos</Text>
            </View>
        );
    };

    const LoadedScreen = () => {
        return (
            <View style={styles.loadedContainer}>
                <Text>{data.location.name}</Text>
                <Text>{data.current.temp_c}°</Text>
                <FlatList
                    data={data.forecast.forecastday}
                    renderItem={({ item }) => <Card dia={item.date} condicion={item.day.condition.text} max={item.day.maxtemp_c} min={item.day.mintemp_c} iko={item.day.condition.icon} />}
                />
            </View>
        );
    };

    const Card = ({ dia, condicion, max, min, iko }) => {
        return (
            <View style={styles.cardContainer}>
                <Text>Fecha={dia}</Text>
                <Text>{condicion}</Text>
                <Text>Max= {max}°C</Text>
                <Text>Min= {min}°C</Text>
                <Image style={styles.icon} source={{ uri: 'https:' + iko }} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clima</Text>
            {load ? <LoadedScreen /> : <LoadingScreen />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        backgroundColor : '#74C3F0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadedContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 8,
        alignItems: 'center',
    },
    icon: {
        height: 30,
        width: 30,
    },
});

export default Clima;
