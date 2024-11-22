import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "./types";
import { getDatabase, ref, push, set } from "firebase/database";
import { NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import globalStyles from "./styles/global";
import { primary_color } from "./constants";
import { auth } from "../../firebaseConfig";

type BookingRouteProp = RouteProp<RootStackParamList, 'booking'>;

export default function BookingPage() {

    const route = useRoute<BookingRouteProp>();
    const database = getDatabase();
    const user = auth.currentUser;

    // Get the car from the route parameters
    const { car } = route.params;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [name, setName] = useState("");
    const [license, setLicense] = useState("");

    const handleConfirm = () => {

        // Check if user is logged in
        if (!user) {
            Alert.alert("Error", "Please login to continue.");
            return;
        }

        // Check if all fields are filled
        if (!name || !license) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        // Prepare rental history data
        const rentalData = {
            name,
            license,
            carMake: car.make,
            carModel: car.model,
            bookingDate: new Date().toISOString(), // Save the current timestamp
        };

        // Save rental history to Firebase Realtime Database
        const rentalHistoryRef = ref(database, `users/${user.uid}/rental_history`);
        const newRentalRef = push(rentalHistoryRef); // Generate a new unique key for the rental history entry

        set(newRentalRef, rentalData)
            .then(() => {
                Alert.alert(
                    "Booking Confirmed",
                    `Thank you ${name}, your booking for the ${car.make} ${car.model} is confirmed!`
                );
                // Navigate to home or another relevant screen
                navigation.navigate("home");
            })
            .catch((error) => {
                Alert.alert("Error", "There was an error saving your booking. Please try again.");
                console.error(error);
            });

        // Navigate back to home or another relevant screen
        navigation.navigate('home');
    };

    return (
        <View style={globalStyles.container}>
            <Text style={styles.header}>Enter Your Details</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Driver's License Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your license number"
                value={license}
                onChangeText={setLicense}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: primary_color,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    confirmButton: {
        backgroundColor: primary_color,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
