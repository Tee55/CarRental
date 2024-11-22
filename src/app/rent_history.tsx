import { View, Text, TextInput, FlatList, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { carImages } from "./constants";
import globalStyles from "./styles/global";
import { auth } from "../../firebaseConfig";

type RentalItem = {
    id: string;
    carMake: string;
    carModel: string;
    license: string;
    bookingDate: string;
};

export default function HistoryPage() {

    const database = getDatabase();

    const [searchQuery, setSearchQuery] = useState('');
    const [rentalData, setRentalData] = useState<RentalItem[]>([]);
    const user = auth.currentUser;

    useEffect(() => {

        if (!user) {
            Alert.alert("Error", "Please login to continue.");
            return;
        }

        const rentalHistoryRef = ref(database, `users/${user.uid}/rental_history`);

        // Get the rental data from the database
        get(rentalHistoryRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const rentalHistory: RentalItem[] = Object.keys(data).map((key) => ({
                        id: key,
                        carMake: data[key].carMake,
                        carModel: data[key].carModel,
                        license: data[key].license,
                        bookingDate: data[key].bookingDate,
                    }));
                    setRentalData(rentalHistory);
                } else {
                    Alert.alert("No rental history found.");
                }
            })
            .catch((error) => {
                Alert.alert("Error fetching data", error.message);
            });
    }, [database]);

    const filteredData = rentalData.filter((item) => {
        const queryLower = searchQuery.toLowerCase();
        return (
            item.carModel.toLowerCase().includes(queryLower) ||
            item.id.includes(queryLower) ||
            item.bookingDate.includes(queryLower)
        );
    });

    const renderItem = ({ item }: { item: RentalItem }) => {

        const imageKey = `${item.carMake.toLowerCase()}_${item.carModel.toLowerCase()}`;
        const imageSource = carImages[imageKey]; // Use default image if not found

        return (
            <View style={styles.card}>
                <Image
                    source={imageSource} // Replace with the car image URL
                    style={styles.carImage}
                    contentFit="contain"
                />
                <View style={styles.cardContent}>
                    <Text style={styles.modelText}>{item.carModel}</Text>
                    <Text style={styles.rentalIdText}>Rental ID: {item.id}</Text>
                    <Text style={styles.dateText}>{item.bookingDate}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={globalStyles.container}>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search"
                />
            </View>

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />

        </View>
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
