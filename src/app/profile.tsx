import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { Link, useNavigation } from "expo-router";
import globalStyles from "./styles/global";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";

export default function ProfilePage() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View>

            {/* Profile Picture Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        style={styles.profileImage} />
                </View>

                {/* Edit Button */}
                <Link href="/edit_profile">
                    <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('edit_profile')}>
                        <Text style={globalStyles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
                <Text style={styles.sectionTitle}>Content</Text>

                {/* Rent History Option */}
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('rent_history')}>
                    <Ionicons name="time" size={18} color="black" />
                    <Text style={styles.optionText}>Rent History</Text>
                    <Ionicons name="chevron-forward" size={18} color="black" />
                </TouchableOpacity>

                {/* Favourite Option */}
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="heart" size={18} color="black" />
                    <Text style={styles.optionText}>Favourite</Text>
                    <Ionicons name="chevron-forward" size={18} color="black" />
                </TouchableOpacity>
            </View>

            {/* Preferences Section */}
            <View style={styles.contentSection}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                {/* Language options */}
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="language" size={18} color="black" />
                    <Text style={styles.optionText}>Language</Text>
                    <Ionicons name="chevron-forward" size={18} color="black" />
                </TouchableOpacity>

                {/* Darkmode option */}
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="moon" size={18} color="black" />
                    <Text style={styles.optionText}>Darkmode</Text>
                    <Ionicons name="chevron-forward" size={18} color="black" />
                </TouchableOpacity>
            </View>
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
    contentSection: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
        color: '#000',
    },
});
