import { View, Text, TouchableOpacity, TextInput, GestureResponderEvent, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import globalStyles from "./styles/global";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User, updateEmail, updatePassword, updateProfile } from "firebase/auth";

export default function EditProfilePage() {

    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userImage, setUserImage] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Update state with user info
                setUsername(currentUser.displayName || '');
                setEmail(currentUser.email || '');
                setUserImage(currentUser.photoURL || '');
            } else {
                setUser(null); // User is not logged in
            }
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    function handleUpdate(event: GestureResponderEvent): void {

        // Check if user is logged in
        if (!user) return;

        // Update user profile
        updateProfile(user, {
            displayName: username,
        });

        // Update user email
        updateEmail(user, email);

        // Update user password
        if (password !== '') {
            updatePassword(user, password);
        }

        Alert.alert('Profile Updated', 'Your profile has been updated successfully');
    }

    return (
        <View>

            {/* Profile Picture Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={userImage || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                        style={styles.profileImage} />
                </View>
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

            <TouchableOpacity style={globalStyles.button} onPress={handleUpdate}>
                <Text style={globalStyles.buttonText}>Update</Text>
            </TouchableOpacity>

        </View>
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
