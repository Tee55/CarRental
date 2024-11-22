import React from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";
import { RootStackParamList } from "../types";

export default function Header({
    title,
    bg_color = "#00a3cc", 
    content_color = "#fff", 
}: {
    title: string;
    bg_color?: string;
    content_color?: string;
}) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack(); 
        } else {
            Alert.alert("No previous screen", "Returning to the home screen.");
            navigation.navigate("home"); 
        }
    };

    const handleSignOut = () => {
        auth.signOut(); 
        navigation.navigate("login_signup");
    };

    return (
        <View style={[styles.header, { backgroundColor: bg_color }]}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={24} color={content_color} />
            </TouchableOpacity>

            <Text style={[styles.headerText, { color: content_color }]}>{title}</Text>

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Ionicons name="log-out" size={24} color={content_color} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    backButton: {
        position: "absolute", 
        left: 15, 
    },
    signOutButton: {
        position: "absolute", 
        right: 15, 
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});