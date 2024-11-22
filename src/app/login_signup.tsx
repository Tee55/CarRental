import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import globalStyles from "./styles/global";

export default function LoginSignupPage() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const toggleLoginSignup = () => setIsLogin(!isLogin);

    const handleSignup = () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert('Success', 'Account created successfully!');
                router.push('/home');
            })
            .catch((error) => Alert.alert('Error', error.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert('Success', 'Logged in successfully!');
                router.push('/home');
            })
            .catch((error) => Alert.alert('Error', error.message));
    };

    return (
        <View style={globalStyles.container}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            )}
            <TouchableOpacity
                style={globalStyles.button}
                onPress={isLogin ? handleLogin : handleSignup}
            >
                <Text style={globalStyles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleLoginSignup}>
                <Text style={styles.switchText}>
                    {isLogin
                        ? 'Don’t have an account? Signup'
                        : 'Already have an account? Login'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    switchText: {
        color: '#007bff',
        marginTop: 10,
        textAlign: 'center',
    },
});
