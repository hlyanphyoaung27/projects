import { Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from "twrnc"
import { useAuth } from "../context/authContext";

export default function MessageItem({message, currentUser}) {
    const {theme, setTheme} = useAuth();
    console.log(currentUser.userId);
    console.log(message.userId)
    if(currentUser.userId == message.userId) {
        //my message
        return (
            <View style={[tw`flex-row justify-end mr-3 mb-3`]}>
                <View style={{width: wp(80)}}>
                   <View style={[tw`flex self-end ${theme == 'dark' ? 'bg-green-400' : 'bg-indigo-200'} p-3 rounded-2xl border-[0.5px] ${theme == 'dark' ? 'border-slate-950' : 'border-indigo-200'}`]}>
                        <Text style={[tw`font-medium ${theme == 'dark' ? 'text-white': 'text-neutral-700'}`, {fontSize: hp(1.8)}]}>{message.text}</Text>
                   </View>
                </View>
            </View>
        )
    }else{
        return(
            <View style={[tw`flex-row justify-start ml-3 mb-3`]}>
                <View style={{width: wp(80)}}>
                   <View style={[tw`flex self-start ${theme == 'dark' ? 'bg-slate-800' : 'bg-white'} p-3 rounded-2xl border ${theme == 'dark' ? 'border-slate-800' : 'border-neutral-200'}`]}>
                        <Text style={[tw`font-medium ${theme == 'dark' ? 'text-white' : 'text-neutral-700'}`, {fontSize: hp(1.8)}]}>{message.text}</Text>
                   </View>
                </View>
            </View>
        )
    }
    
}