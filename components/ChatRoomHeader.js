import { Stack } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from "react-native";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import Active from "./Active";
import { useAuth } from "../context/authContext";

export default function ChatRoomHeader({ user, router }) {
    const { theme, setTheme } = useAuth();
    return (
        <Stack.Screen
            options={{
                title: "",
                headerShadowVisible: false,
                headerStyle: {backgroundColor: theme === "dark" ? "rgb(8 47 73)" : "rgb(129 140 248)", },
                headerLeft: () => (
                  
                        <View style={[tw`flex-row py-2 items-center gap-4`]}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Entypo name="chevron-left" size={20} color={theme == 'dark' ? 'rgb(203 213 225)' : "white"}  />
                            </TouchableOpacity>
                            <View style={tw`flex-row gap-1 items-center`}>
                                <Image
                                    source={user.profileUrl}
                                    style={{ height: hp(6.5), aspectRatio: 1, borderRadius: 100 }}
                                />
                                <View>
                                    <Text style={[tw`font-medium ${theme == 'dark' ? 'text-white' : 'text-white'} mx-4`, { fontSize: hp(2.2) }]}>{user.username}</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <Active size={hp(4)} />
                                        <Text style={[tw`font-medium text-neutral-200`, { fontSize: hp(1.5) }]}>Active now</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                  
                ),
                headerRight: () => (
                    <View style={[tw`flex-row items-center gap-5 `]}>
                        <TouchableOpacity>
                            <Feather name="phone-call" size={18} color={theme == 'dark' ? 'rgb(203 213 225)' : "white"} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="video" size={20} color={theme == 'dark' ? 'rgb(203 213 225)' : "white"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="info" size={20} color={theme == 'dark' ? 'rgb(203 213 225)' : "white"}/>
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}