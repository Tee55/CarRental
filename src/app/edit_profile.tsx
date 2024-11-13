import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import Header from "./components/header";
import { useState } from "react";
import globalStyles from "./styles/global";

export default function EditProfile() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {/* Header */}
            <Header title="Edit Profile" content_color="#fff"/>

            {/* Profile Picture Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        style={styles.profileImage} />
                </View>

                {/* Edit Button */}
                <TouchableOpacity style={styles.changePictureButton}>
                    <Text style={styles.changePictureText}>Change Picture</Text>
                </TouchableOpacity>
            </View>

            {/* Input Container */}
            <View style={styles.inputContainer}>

                <View style={styles.inputRow}>
                    <Text>Username</Text>
                    <TextInput
                        style={globalStyles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                    />
                </View>

                <View style={styles.inputRow}>
                    <Text>Email</Text>
                    <TextInput
                        style={globalStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputRow}>
                    <Text>Phone Number</Text>
                    <TextInput
                        style={globalStyles.input}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputRow}>
                    <Text>Password</Text>
                    <TextInput
                        style={globalStyles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
            </View>

            <TouchableOpacity style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Update</Text>
            </TouchableOpacity>

        </>
    );
}

const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        backgroundColor: '#00a3cc',
        paddingVertical: 30,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#cfcfcf',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
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
    inputRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
