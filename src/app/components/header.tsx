import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../types";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";

export default function Header({ title, bg_color, content_color }: { title: string, bg_color?: string | undefined, content_color?: string | undefined }) {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            Alert.alert("No previous screen to go back to");
            navigation.navigate("home");
        }
    };

    const handleSignOut = () => {
        auth.signOut();
        navigation.navigate("login_signup");
    };

    return (
        <View style={[styles.header, { backgroundColor: bg_color }]}>
            {/* Back Icon */}
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={content_color}
                />
            </TouchableOpacity>

            {/* Title */}
            <Text style={[styles.headerText, { color: content_color }]}>{title}</Text>

            {/* Sign Out Icon */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} >
                <Ionicons
                    name="log-out"
                    size={24}
                    color={content_color}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center', // Ensures title is centered horizontally
        alignItems: 'center',
        backgroundColor: '#00a3cc',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    backButton: {
        position: 'absolute',  // Position the back icon on the left
        left: 15,  // Adjust the position from the left side
    },
    signOutButton: {
        position: 'absolute',  // Position the back icon on the left
        right: 15,  // Adjust the position from the left side
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,  // Ensures the title is centered
    },
});
