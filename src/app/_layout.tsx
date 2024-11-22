import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { primary_color } from './constants';

export default function Layout() {
    const router = useRouter();
    const segments = useSegments();

    return (
        <Stack
            initialRouteName="home"
            screenOptions={{
                headerStyle: { backgroundColor: primary_color },
                headerTitleStyle: { color: '#fff' },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerLeft: () => null, 
                }}
            />
            <Stack.Screen
                name="booking"
                options={{
                    title: 'Booking',
                    headerLeft: () =>
                        segments.length > 1 ? (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        ) : null,
                }}
            />
            <Stack.Screen
                name="car_details"
                options={{
                    title: 'Car Details',
                    headerLeft: () =>
                        segments.length > 1 ? (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        ) : null,
                }}
            />
            <Stack.Screen
                name="confirmation"
                options={{
                    title: 'Confirmation',
                    headerLeft: () =>
                        segments.length > 1 ? (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        ) : null,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerLeft: () =>
                        segments.length > 1 ? (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        ) : null,
                }}
            />
            <Stack.Screen
                name="edit_profile"
                options={{
                    title: 'Edit Profile',
                    headerLeft: () =>
                        segments.length > 1 ? (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        ) : null,
                }}
            />
            <Stack.Screen
                name="rent_history"
                options={{
                    title: 'Rent History',
                    headerLeft: () =>
                        segments.length > 1 ? (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                    style={{ marginLeft: 10 }}
                                />
                            </TouchableOpacity>
                        ) : null,
                }}
            />
        </Stack>
    );
}