import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Keyboard, Text, TextInput, View } from "react-native";
import tw from "twrnc"
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import MessageList from "../../components/MessageList";
import { useAuth } from "../../context/authContext";
import { useEffect, useRef, useState } from "react";
import { getRoomId } from "../../components/common";
import { addDoc, collection, collectionGroup, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";


export default function chatRoom() {
    const item = useLocalSearchParams();
    const { user } = useAuth();
    const router = useRouter();
    console.log("got item:", item);
    const [messages, setMessages] = useState([]);
    const textRef = useRef();
    const inputRef = useRef();
    const scrollRef = useRef(null);
    const { theme, setTheme } = useAuth();

    useEffect(() => {
        createRoomIdIfNotExist();
        let roomId = getRoomId(user.userId, item.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        const unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            console.log(messages)
            setMessages([...allMessages]);

        });

        const keyBoardDidShowListner = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )
        return () => {
            unsub();
            keyBoardDidShowListner.remove();
        }
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages])


    const createRoomIdIfNotExist = async () => {
        const roomId = getRoomId(user.userId, item.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const updateScrollView = () => {
        setTimeout(() => {
            scrollRef.current.scrollToEnd({ animated: true })
        }, 100)
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();

        if (!message) return;
        try {
            const roomId = getRoomId(user.userId, item.userId);
            const docRef = doc(db, "rooms", roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) inputRef.current.clear();
            const newDoc = await addDoc(messageRef, {
                userId: user.userId,
                text: message,
                profileUrl: user.profileUrl,
                senderName: user.username,
                createdAt: Timestamp.fromDate(new Date())
            });
            console.log(newDoc)
        } catch (e) {
            Alert.alert("Messages:", e.messages)
        }
    }

    console.log("Messages: ", messages)

    return (
        <View style={tw`${theme == "dark" ? 'bg-slate-950' : ''} flex-1`}>
            <StatusBar style="light" />
            <ChatRoomHeader user={item} router={router} />
            <View style={tw`flex-1 ${theme == 'dark' ? 'bg-sky-950' : 'bg-indigo-400'}`}>
                <View style={tw`flex-1 ${theme == "dark" ? 'bg-slate-900' : 'bg-neutral-100'} overflow-visible rounded-t-3xl`}>
                    <View style={tw`flex-1`}>
                        <MessageList scrollRef={scrollRef} messages={messages} currentUser={user} />
                    </View>
                    <View style={[{ marginBottom: hp(1.5) }, tw`pt-4`]}>
                        <View style={tw`${theme == 'dark' ? 'bg-slate-800' : 'bg-neutral-200'} border ${theme == 'dark' ? 'border-slate-900' : 'border-neutral-200'} rounded-full flex-row p-2 m-2 justify-between`}>
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder="Type messages..."
                                placeholderTextColor={theme == 'dark' ? 'rgb(226 232 240)' : ''}
                                style={[{ fontSize: hp(2.4) }, tw`flex-1 items-center  mx-4 ${theme == 'dark' ? 'text-white' : ''}`]}
                            />
                            <TouchableOpacity
                                onPress={handleSendMessage}
                                style={tw` rounded-full border ${theme == 'dark' ? 'bg-sky-950 border-sky-950' : 'bg-indigo-400 border-indigo-400'}  p-2`}>
                                <Feather name="send" size={hp(2.7)} color={theme == 'dark' ? 'rgb(203 213 225)' : 'white'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}