import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParamList } from "./types";
import { useNavigation } from "expo-router";
import { NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import globalStyles from "./styles/global";
import { primary_color } from "./constants";

type CarDetailsRouteProp = RouteProp<RootStackParamList, 'car_details'>;

export default function CarDetailsPage() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<CarDetailsRouteProp>();
    const { car, imageSource } = route.params;

    if (!car || !imageSource) {
        return <Text>Error: Missing car data or image source</Text>; // Handle missing params gracefully
    }

    const handleBook = () => {
        // Navigate to BookingForm with car details
        navigation.navigate('booking', { car: car });
    };

    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Image source={imageSource} style={styles.carImage} />
            <Text style={styles.title}>{`${car.make} ${car.model}`}</Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{car.availability ? "Available" : "Unavailable"}</Text>
            </View>
            <Text style={styles.priceText}>${car.price_per_day}/day</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                    <Text style={styles.label}>Color: </Text>
                    {car.color}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.label}>Expected Return Date: </Text>
                    {car.expected_return_date}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.bookButton, !car.availability && styles.disabledButton]}
                onPress={car.availability ? handleBook : undefined}
                disabled={!car.availability}
            >
                <Text style={styles.bookButtonText}>
                    {car.availability ? "Book Now" : "Unavailable"}
                </Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    carImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    badge: {
        alignSelf: "center",
        backgroundColor: primary_color,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "bold",
    },
    priceText: {
        fontSize: 20,
        fontWeight: "bold",
        color: primary_color,
        textAlign: "center",
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
    },
    bookButton: {
        padding: 15,
        backgroundColor: primary_color,
        borderRadius: 10,
        alignItems: "center",
    },
    bookButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
});