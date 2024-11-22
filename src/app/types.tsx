import { ImageSourcePropType } from "react-native";

export default interface CarData {
    id: string;
    make: string;
    model: string;
    color: string;
    price_per_day: string;
    expected_return_date: string;
    availability: boolean;
    location: {
        province: string;
        district: string;
    };
    imageKey: string;
}

// Note: The names of the routes must match the file names in the app folder
export type RootStackParamList = {
    login_signup: undefined;
    car_details: { car: CarData, imageSource: ImageSourcePropType };
    booking: { car: CarData };
    home: undefined;
    profile: undefined;
    edit_profile: undefined;
    rent_history: undefined;
};