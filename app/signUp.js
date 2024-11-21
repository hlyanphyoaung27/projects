import { Alert, Image, Text, View } from "react-native";
import tw from "twrnc"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/CoustomKeyBoard";
import CustomModalAlert from "../components/CustomAlert";
import { useAuth } from "../context/authContext";

export default function signUp() {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const imageRef = useRef("");
    const [showAlert, setShowAlert] = useState(false);
    const {register} = useAuth()
    const [loading, setLoading] = useState(false)
    const handleRegister = async() => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current || !imageRef.current) {
            setShowAlert(true);
            return;
        }
        setLoading(true)
        let response = await register(emailRef.current, passwordRef.current, nameRef.current, imageRef.current);

        setLoading(false)
        console.log("got result:", response);
        if(!response.success) {
            Alert.alert("Sign up", response.msg)
        }
        //login process
    }
    return (
        <CustomKeyboardView style={tw`flex-1`}>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: hp(3) }}>

                {showAlert ?
                    <CustomModalAlert text="Please fills all fields!"
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    /> : <></>}

                <View style={tw`items-center gap-12`}>
                    <Image style={{ height: hp(30) }} resizeMode="contain" source={require('../assets/images/signup.jpg')} />
                </View>




                <Text style={[tw`font-bold text-center  tracking-wider text-neutral-800`, { fontSize: hp(2), marginTop: hp(3) }]}>Register</Text>

                <View style={[tw`gap-3`, { marginTop: hp(3) }]}>

                    <View style={[tw`flex-row gap-4  px-5 py-3 items-center bg-neutral-100 rounded-xl`, { height: hp(7) }]}>
                        <Feather size={hp(2.7)} name="user" color="gray" />
                        <TextInput onChangeText={value => nameRef.current = value} style={[tw`text-neutral-700 flex-1 font-semibold`, { fontSize: hp(2) }]} placeholder="Username" placeholderTextColor="gray"
                        />
                    </View>

                    <View style={[tw`flex-row gap-4  px-5 py-3 items-center bg-neutral-100 rounded-xl`, { height: hp(7) }]}>
                        <Octicons size={hp(2.7)} name="mail" color="gray" />
                        <TextInput onChangeText={value => emailRef.current = value} style={[tw`text-neutral-700 flex-1 font-semibold`, { fontSize: hp(2) }]} placeholder="Email" placeholderTextColor="gray" />
                    </View>

                    <View style={[tw`flex-row gap-4  px-5 py-3 items-center bg-neutral-100 rounded-xl`, { height: hp(7) }]}>
                        <Octicons size={hp(2.7)} name="lock" color="gray" />
                        <TextInput onChangeText={value => passwordRef.current = value} style={[tw`text-neutral-700 flex-1 font-semibold`, { fontSize: hp(2) }]} placeholder="Password" placeholderTextColor="gray"
                            secureTextEntry />
                    </View>

                    <View style={[tw`flex-row gap-4  px-5 py-3 items-center bg-neutral-100 rounded-xl`, { height: hp(7) }]}>
                        <Feather size={hp(2.7)} name="image" color="gray" />
                        <TextInput onChangeText={value => imageRef.current = value} style={[tw`text-neutral-700 flex-1 font-semibold`, { fontSize: hp(2) }]} placeholder="Profile picture" placeholderTextColor="gray"
                        />
                    </View>

                    <View>
                        {loading ? (
                            <View style={tw`flex-row justify-center`}>
                                <Loading size={hp(6.5)} />
                            </View>
                        )
                            :
                            (<TouchableOpacity onPress={handleRegister} style={[tw`bg-orange-400 rounded-xl py-2.5 `, { height: hp(6), marginTop: hp(1) }]}>
                                <Text style={[tw`text-white font-bold text-center`, { fontSize: hp(2) }]}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>)}
                    </View>


                    <View style={[tw`gap-2 flex-row justify-center`]}>
                        <Text style={[{ fontSize: hp(1.8) }, tw`text-neutral-400 font-semibold`]}>
                            You already have an account.
                        </Text>
                        <Pressable onPress={() => router.push('signIn')}>
                            <Text style={[{ paddingLeft: 3, fontSize: hp(1.8) }, tw`text-indigo-400 font-semibold`]}>Sign In</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </CustomKeyboardView>


    )
}