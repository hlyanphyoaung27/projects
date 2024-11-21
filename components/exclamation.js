import LottieView from "lottie-react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Exclamation() {
    return (
        <View style={{height: hp(6.5), aspectRatio: 1}}>
            <LottieView  style={{flex: 1}} source={require('../assets/images/exclamation.json')} autoPlay loop/>
        </View>
    )
}