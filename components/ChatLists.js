import { FlatList, Text, View } from "react-native";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

export default function ChatLists({users, user}) {
    const router = useRouter();
    
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={users}
                keyExtractor={item => Math.random()}
                renderItem={({item, index}) => 
                <ChatItem item={item} 
                index={index}
                noBorder = {index+1 == users.length}
                router = {router}
                currentUser={user}
                />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: 25, flex: 1}}
            />
        </View>
    )
}