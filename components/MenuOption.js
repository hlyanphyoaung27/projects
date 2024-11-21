import { Text, View } from 'react-native';
import {


    MenuOption,

  } from 'react-native-popup-menu';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import tw from "twrnc"

  export default function Popup ({text, action, value, icon }) {
    return(
        <MenuOption onSelect = {() => action(value)}>
            <View style={tw`flex-row px-4 py-1 justify-start mb-2`}>
                {icon}
                <Text style={[tw`font-semibold text-neutral-600 mx-4 `, {fontSize: hp(2)}]}>{text}</Text>
            </View>
        </MenuOption>
    )
  }