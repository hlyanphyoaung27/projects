import { Alert, Image, Text, View } from "react-native";
import tw from "twrnc"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/CoustomKeyBoard";
import Exclamation from "../components/exclamation";
import CustomAlert from "../components/CustomAlert";
import { useAuth } from "../context/authContext";

export default function signIn() {
    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const {login} = useAuth()
    const handleLogin = async() => {
      
        if (!emailRef.current || !passwordRef.current) {
            setShowAlert(true);
            return
        }
        setShowAlert(false)
        setLoading(true);
        
        let response = await login(emailRef.current, passwordRef.current);
        
        console.log(response)
        setLoading(false);
        if(!response.success) {
            Alert.alert("Sign In", response.msg)
        }
    }
    return (
        <CustomKeyboardView style={tw`flex-1`}>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: hp(3) }}>


                {showAlert ?
                    <CustomAlert text="Please fills all fields!"
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    /> : <></>}

                <View style={tw`items-center gap-12`}>
                    <Image style={{ height: hp(30) }} resizeMode="contain" source={require('../assets/images/login.jpg')} />
                </View>



                <Text style={[tw`font-bold text-center  tracking-wider text-neutral-800`, { fontSize: hp(2), marginTop: hp(3) }]}>Sign In</Text>

                <View style={tw`gap-3`}>
                    <View style={{ marginTop: hp(3) }}>
                        <View style={[tw`flex-row gap-4  px-5 py-3 items-center bg-neutral-100 rounded-xl`, { height: hp(7) }]}>
                            <Octicons size={hp(2.7)} name="mail" color="gray" />
                            <TextInput onChangeText={value => emailRef.current = value} style={[tw`text-neutral-700 flex-1 font-semibold`, { fontSize: hp(2) }]} placeholder="Email" placeholderTextColor="gray" />
                        </View>
                    </View>
                    <View style={tw`gap-3`}>

                        <View style={[tw`flex-row gap-4  px-5 py-3 items-center bg-neutral-100 rounded-xl`, { height: hp(7) }]}>
                            <Octicons size={hp(2.7)} name="lock" color="gray" />
                            <TextInput onChangeText={value => passwordRef.current = value} style={[tw`text-neutral-700 flex-1 font-semibold`, { fontSize: hp(2) }]} placeholder="Password" placeholderTextColor="gray"
                                secureTextEntry />
                        </View>

                        <Text style={[tw`text-neutral-400 text-right font-semibold`, { fontSize: hp(1.7) }]}>
                            Forgot password?
                        </Text>

                    </View>

                    <View>
                        {loading ? (
                            <View style={tw`flex-row justify-center`}>
                                <Loading size={hp(6.5)}/>
                            </View>
                            // <View style={tw`flex-row justify-center`}>
                            //     <Exclamation size={hp(6.5)} />
                            // </View>
                        )
                            :
                            (<TouchableOpacity onPress={handleLogin} style={[tw`bg-orange-400 rounded-xl py-2.5 `, { height: hp(6), marginTop: hp(1) }]}>
                                <Text style={[tw`text-white font-bold text-center`, { fontSize: hp(2) }]}>
                                    Log In
                                </Text>
                            </TouchableOpacity>)}
                    </View>


                    <View style={[tw`gap-2 flex-row justify-center`]}>
                        <Text style={[{ fontSize: hp(1.8) }, tw`text-neutral-400 font-semibold`]}>Do you haven't an account?
                        </Text>
                        <Pressable onPress={() => router.push('signUp')}>
                            <Text style={[{ paddingLeft: 3, fontSize: hp(1.8) }, tw`text-indigo-400 font-semibold`]}>Sign up</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </CustomKeyboardView>


    )
}