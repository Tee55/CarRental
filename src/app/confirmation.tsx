import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { useState } from "react";
import globalStyles from "./styles/global";

export default function ConfirmationPage() {

    const [carModel, setCarModel] = useState('Honda City');
    const [pickupLocation, setPickupLocation] = useState('Don Mueang International Airport, Bangkok');
    const [phoneNumber, setPhoneNumber] = useState('+1 498 788 9999');
    const [totalPrice, setTotalPrice] = useState('5000');

    return (
        <View style={globalStyles.container}>

            {/* Car Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/200' }} // Replace with the car image URL
                    style={styles.carImage}
                    contentFit="contain"
                />
            </View>

            {/* Input Container */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={globalStyles.input}
                    value={carModel}
                    onChangeText={setCarModel}
                    placeholder="Car Model"
                />
                <TextInput
                    style={globalStyles.input}
                    value={pickupLocation}
                    onChangeText={setPickupLocation}
                    placeholder="Pickup Location"
                />
                <TextInput
                    style={globalStyles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={globalStyles.input}
                    value={totalPrice}
                    onChangeText={setTotalPrice}
                    placeholder="Total Price"
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    carImage: {
        width: 200,
        height: 100,
    },
    changePictureButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    changePictureText: {
        color: '#888',
    },
    inputContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
});
