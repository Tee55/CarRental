import { View, Text, TouchableOpacity, TextInput, FlatList, Button } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import Header from "./components/header";
import { useState } from "react";
import globalStyles from "./styles/global";
import Ionicons from '@expo/vector-icons/Ionicons';


type RentalItem = {
    id: string;
    model: string;
    price: string;
    rentalId: string;
    date: string;
    time: string;
};

const rentalData: RentalItem[] = [
    {
        id: '1',
        model: 'Honda City',
        price: '$350.00',
        rentalId: '698094554317',
        date: '17 Sep 2023',
        time: '11:21 AM',
    },
    {
        id: '2',
        model: 'Honda City',
        price: '$350.00',
        rentalId: '698094554317',
        date: '17 Sep 2023',
        time: '11:21 AM',
    },
    // Add more items as needed
];


export default function Confirmation() {

    const [searchQuery, setSearchQuery] = useState('');

    const renderItem = ({ item }: { item: RentalItem }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://via.placeholder.com/60' }} // Replace with the car image URL
                style={styles.carImage}
            />
            <View style={styles.cardContent}>
                <Text style={styles.modelText}>{item.model}</Text>
                <Text style={styles.rentalIdText}>Rental ID {item.rentalId}</Text>
                <Text style={styles.dateText}>{item.date}   {item.time}</Text>
            </View>
            <Text style={styles.priceText}>{item.price}</Text>
        </View>
    );

    return (
        <>
            {/* Header */}
            <Header title="History" bg_color="#fff" content_color="#00a3cc" />

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search"
                />
                <Ionicons name="filter" size={18} color="black" />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={globalStyles.button}>
                    <Text style={globalStyles.buttonText}>This Week</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={rentalData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />

        </>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    filterIcon: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00a3cc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
    },
    carImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
    },
    modelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rentalIdText: {
        color: '#888',
        marginTop: 5,
    },
    dateText: {
        color: '#888',
        marginTop: 5,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00a3cc',
    },
});
