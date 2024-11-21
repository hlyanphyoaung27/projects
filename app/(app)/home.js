import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import tw from "twrnc"
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatLists from "../../components/ChatLists";
import Loading from "../../components/loading";
import {  getDocs, query, where } from "firebase/firestore";
import { userRef } from "../../firebaseConfig";
export default function Home() {
    const {logout, user} = useAuth();
    const [users, setUsers] = useState([]);
    const {theme, setTheme} = useAuth();
    console.log("User data:", user)
    const handleLogout = async() => {
        await logout();
    }

    useEffect(() => {
        if(user?.uid) 
            getUsers();
    },[])

    const getUsers = async() => {
        const q = query(userRef, where("userId", "!=", user.uid));
        const querySnap = await getDocs(q);
        let data = [];

        querySnap.forEach(doc => {
            data.push({...doc.data()});
        });

        setUsers(data);
        console.log("other users: ", users);
        
    }
   
    return (
        <View style={[tw`flex-1 ${theme == 'dark' ? 'bg-slate-900': 'bg-white'}`]}>
            <StatusBar style={theme == "dark" ? 'dark' : 'light]'} />
            

            {
                users.length>0 ? (
                    <ChatLists  user={user} users={users}/>
                ):(
                    <View style={[tw`flex items-center`, {top: hp(35)}]}>
                        <Loading size={hp(8)} />
                    </View>
                )
            }
        </View>
    )
}