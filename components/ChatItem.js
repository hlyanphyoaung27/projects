import { useEffect, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from "twrnc"
import { formDate, getRoomId } from "./common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/authContext";
export default function     ChatItem({item, router, noBorder, currentUser}) {

    const [lastMessages, setLastMessages] = useState(undefined);
    const {theme , setTheme } = useAuth()

    useEffect(() => {

        let roomId = getRoomId(currentUser.userId, item.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        const unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc=> {
                return doc.data();
            });
            
            setLastMessages(allMessages[0]? allMessages[0]: null);
            
        });
        return unsub;
    },[])


    const openChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item})
    }

    const renderTime = () => {
        if(lastMessages) {
            let date = lastMessages.createdAt;
            return formDate(new Date(date.seconds * 1000));
        }
    }

    console.log("Last Messages: ", lastMessages)
    const renderLastMessage = () => {
        if(typeof lastMessages == 'undefined') return "Loading...";
        if(lastMessages) {
            if(currentUser.userId == lastMessages.userId) return "You: " + lastMessages.text ;
            return lastMessages.text;
        }else{
            return "Say Hi 👋"
        }
    }
    return(
        <TouchableOpacity onPress={openChatRoom} style={[tw`flex-row items-center justify-between pb-4 mx-4 mb-4 gap-5 ${noBorder? '' : 'border-b-[1px]  rounded-md'} ${theme == "dark"? 'border-zinc-800': 'border-neutral-200'}` ]}>
            <Image source={{uri: item.profileUrl}} style={[{height: hp(6), width: hp(6)}, tw`rounded-full `]} />

            <View style={[tw`flex-1 gap-1`]}>
                <View style={[tw`flex-row justify-between`]}>
                    <Text style={[{fontSize: hp(2)}, tw`font-medium ${theme == "dark" ? 'text-slate-50' : 'text-neutral-700'}`]}>{item.username}</Text>
                    <Text style={[{fontSize: hp(1.3)}, tw`font-medium text-neutral-200`]}>
                        {renderTime()}
                    </Text>
                </View>
                <Text style={[{fontSize: hp(1.8)}, tw`font-medium text-neutral-400`]}>
                    {renderLastMessage()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}