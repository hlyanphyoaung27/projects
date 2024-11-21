import { Switch, Text, View } from "react-native";
import tw from "twrnc";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from "expo-image";
import { blurhash } from "./common";
import { useAuth } from "../context/authContext";
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import MenuOption from "./MenuOption";
import Popup from "./MenuOption";
import { AntDesign, Feather } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { colorScheme, useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

// // Use imperatively
// colorScheme.set("dark" | "light" | "system");


export default function Header() {
    const { theme, setTheme } = useAuth();




    console.log(theme)
    const { user, logout } = useAuth()
    console.log(user.email)

    const handleProfile = () => {

    }

    const handleTheme = () => {
        if (theme === "light") {
            setTheme("dark");  // Manually switch to light
        } else {
            setTheme("light");  // Manually switch to dark
        }
    };

    const handleLogout = async () => {
        const userRef = doc(db, 'users', user.userId);
        await updateDoc(userRef, {online: 'false'})
        await logout();
    }

    return (
        <View style={tw`${theme == "dark" ? 'bg-slate-900' : 'bg-white'}`}>
            <View style={[{ paddingTop: hp(5), paddingBottom: hp(2) }, tw`flex-row items-center rounded-3xl justify-between  px-8 ${theme == "light" ? 'bg-indigo-400' : 'bg-sky-950'}`]}>
                <View style={tw`flex-row gap-2 items-center`}>
                    <TouchableOpacity onPress={handleTheme}>
                        {theme === "dark" ? (<Feather name="sun" size={24} color="white" />) : (<Feather name="moon" size={24} color="white" />)}
                    </TouchableOpacity>
                </View>
                <Text style={[tw`font-semibold text-white`, { fontSize: hp(2.8) }]}>Chats</Text>
                <View>
                    <Menu>
                        <MenuTrigger>
                            <Image
                                style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
                                source={user.profileUrl}
                                transition={1000}
                            />
                        </MenuTrigger>
                        <MenuOptions
                            customStyles={{
                                optionsContainer: {
                                    borderRadius: 10,
                                    borderCurve: "continuous",
                                    marginTop: 50,
                                    backgroundColor: "white",
                                    shadowOpacity: 0.2,
                                    shadowOffset: { height: 0, width: 0 },
                                    width: 160,
                                }
                            }}
                        >
                            <Popup
                                text="Profile"
                                action={handleProfile}
                                value={null}
                                icon={<Feather size={hp(2.5)} name="user"

                                />}
                            />
                            <Sider style={tw`${theme == 'dark' ? 'bg-indigo-400' : 'bg-neutral-200'}`} />
                            <Popup
                                text="Logout"
                                action={handleLogout}
                                value={null}
                                icon={<AntDesign size={hp(2.5)} name="logout" />}
                            />
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
        </View>
    )
}


function Sider() {
    return (
        <View style={[tw`p-[1px] w-full`]}></View>
    )
}