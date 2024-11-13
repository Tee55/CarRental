import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import Header from "./components/header";
import { Link } from "expo-router";
import globalStyles from "./styles/global";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Profile() {
    return (
        <>
            <Header title="Login" />
        </>
    );
}

const styles = StyleSheet.create({
});
