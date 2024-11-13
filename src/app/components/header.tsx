import React from "react";
import { View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";

export default function Header({ title, bg_color, content_color }: { title: string, bg_color?: string | undefined, content_color?: string | undefined }) {
    
    return (
        <View style={[styles.header, { backgroundColor: bg_color }]}>
            <Ionicons name="arrow-back" size={24} color={content_color} style={styles.backIcon} />
            <Text style={[styles.headerText, { color: content_color }]}>{title}</Text>
            <Ionicons name="notifications-outline" size={24} color={content_color} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00a3cc',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    backIcon: {
        paddingHorizontal: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});