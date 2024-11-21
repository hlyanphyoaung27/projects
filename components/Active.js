import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function  Active({size}) {
    return (
        <View style={{height: size, aspectRatio: 1}}>
            <LottieView  style={{flex: 1}} source={require('../assets/images/active.json')} autoPlay loop/>
        </View>
    )
}