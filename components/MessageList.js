import { ScrollView, Text, View } from "react-native";
import MessageItem from "./MessageItem";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageList({messages,scrollRef, currentUser}) {
    return(
       <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: hp(3)}}>
            {messages.map((message, index) => {
                return (
                    <MessageItem message={message} key={index} currentUser={currentUser}/>
                )
            })}
       </ScrollView>
    )
}