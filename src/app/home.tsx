import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { carImages, primary_color } from "./constants";
import CarData from "./types";
import { RootStackParamList } from "./types";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "./styles/global";

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const database = getDatabase();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [availableCars, setAvailableCars] = useState<CarData[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [allCars, setAllCars] = useState<CarData[]>([]);  // Store all cars to filter locally

    // Fetch cars from Firebase
    useEffect(() => {
        const carsRef = ref(database, "cars");
        onValue(carsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const cars: CarData[] = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setAllCars(cars);  // Store all cars for filtering
                filterCars(selectedDate, cars);
            } else {
                setAvailableCars([]);
            }
        });
    }, [selectedDate, database]);

    // Filter cars based on availability and expected return date
    const filterCars = (date: string, cars: CarData[]) => {
        if (!date) {
            setAvailableCars(cars);  // If no date is selected, show all cars
            return;
        }

        const filteredCars = cars.filter((car) => {
            const returnDate = new Date(car.expected_return_date);
            const selected = new Date(date);

            // Check if car is available or expected return date is after selected date
            const isAvailable = car.availability || returnDate > selected;
            return isAvailable;
        });
        setAvailableCars(filteredCars);
    };

    // Handle date selection
    const onDateChange = (event: any, selectedDateValue?: Date) => {
        setShowDatePicker(false); // Hide the date picker
        if (selectedDateValue) {
            const formattedDate = selectedDateValue.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
            setSelectedDate(formattedDate); // Update the selected date
        }
    };

    // Render car list items
    const renderCarItem = ({ item }: { item: CarData }) => {
        const imageKey = `${item.make.toLowerCase()}_${item.model.toLowerCase()}`;
        const imageSource = carImages[imageKey]; // Use default image if not found

        return (
            <View style={styles.carCard}>
                <Image source={imageSource} style={styles.carImage} />
                <View style={styles.carDetails}>
                    <Text style={styles.carTitle}>
                        {item.make} {item.model} ({item.color})
                    </Text>
                    <Text style={styles.carLocation}>
                        {item.location.province}, {item.location.district}
                    </Text>
                    <Text style={styles.carPrice}>{item.price_per_day} PER DAY</Text>
                    <TouchableOpacity
                        style={styles.rentButton}
                        onPress={() =>
                            navigation.navigate('car_details', { car: item, imageSource: imageSource })
                        }
                    >
                        <Text style={styles.rentButtonText}>Rent Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={globalStyles.container}>
            {/* Header with Profile Icon */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Welcome to CarRental! Your perfect ride is just a few taps away. Let's find the car that suits your adventure.</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('profile')
                    } // Placeholder action
                >
                    <Ionicons name="person-circle" size={40} color={primary_color} />
                </TouchableOpacity>
            </View>
            <View style={styles.datePickerContainer}>
                <Text style={styles.label}>Pick a date</Text>
                <View style={styles.dateInputWrapper}>
                    <TextInput
                        placeholder="YYYY-MM-DD"
                        value={selectedDate}
                        onChangeText={(text) => {
                            setSelectedDate(text);
                            filterCars(text, allCars); // Filter cars when typing a date
                        }}
                        style={styles.dateInput}
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Ionicons name="calendar" size={24} color={primary_color} />
                    </TouchableOpacity>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate ? new Date(selectedDate) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={onDateChange}
                />
            )}

            <Text style={styles.subHeader}>Available Cars</Text>
            <FlatList
                data={availableCars}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCarItem}
                ListEmptyComponent={<Text style={styles.noCarsText}>No cars available</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff', 
    },
    header: {
        flex: 1, // Ensures the text takes up the remaining space
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10, // Prevents overlap with the icon
        textAlign: 'left', // Left aligns the text
        lineHeight: 22, // Improves line spacing for readability
    },
    datePickerContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dateInputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    dateInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    noCarsText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
    },
    carCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    carImage: {
        width: 80,
        height: 50,
        marginRight: 15,
        borderRadius: 5,
    },
    carDetails: {
        flex: 1,
    },
    carTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    carLocation: {
        fontSize: 14,
        color: "#888",
        marginBottom: 5,
    },
    carPrice: {
        fontSize: 14,
        color: primary_color,
        marginBottom: 10,
    },
    rentButton: {
        padding: 10,
        backgroundColor: primary_color,
        borderRadius: 5,
        alignItems: "center",
    },
    rentButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
