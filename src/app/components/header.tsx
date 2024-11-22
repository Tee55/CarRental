import React from "react";
import { View, Text, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../types";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

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

    return (
        <View style={[styles.header, { backgroundColor: bg_color }]}>
            {/* Back Icon */}
            <Ionicons 
                name="arrow-back" 
                size={24} 
                color={content_color} 
                style={styles.backIcon} 
                onPress={handleGoBack}
            />
            
            {/* Title */}
            <Text style={[styles.headerText, { color: content_color }]}>{title}</Text>
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
    backIcon: {
        position: 'absolute',  // Position the back icon on the left
        left: 15,  // Adjust the position from the left side
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,  // Ensures the title is centered
    },
});
