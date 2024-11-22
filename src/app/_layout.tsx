import { Stack } from 'expo-router';
import Header from './components/header';
import { primary_color } from './constants';

export default function Layout() {
    return (
        <Stack
            initialRouteName='home'
        >
            <Stack.Screen name='index' options={{ headerShown: false }}/>
            <Stack.Screen name='home' options={{ 
                header: () => <Header title='Home' bg_color={primary_color} content_color='#fff' />
             }}/>
            <Stack.Screen name='booking' options={{
                header: () => <Header title='Booking' bg_color={primary_color} content_color='#fff' />
            }}/>
            <Stack.Screen name='car_details' options={{
                header: () => <Header title='Car Details' bg_color={primary_color} content_color='#fff' />
            }}/>
            <Stack.Screen name='confirmation' options={{
                header: () => <Header title='Confirmation' bg_color={primary_color} content_color='#fff' />
            }}/>
            <Stack.Screen name='profile' options={{
                header: () => <Header title='Profile' bg_color={primary_color} content_color='#fff' />
            }}/>
            <Stack.Screen name='edit_profile' options={{
                header: () => <Header title='Edit Profile' bg_color={primary_color} content_color='#fff' />
            }}/>
            <Stack.Screen name='rent_history' options={{
                header: () => <Header title='Rent History' bg_color={primary_color} content_color='#fff' />
            }}/>
        </Stack>
    );
}
