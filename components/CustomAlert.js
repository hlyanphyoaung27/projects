import React, { useState } from "react";
import { Modal, Text, View, Button } from "react-native";
import Exclamation from "./exclamation";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { transpileModule } from "typescript";

export default function CustomModalAlert({ text, showAlert, setShowAlert }) {
    

    return (
        <View style={tw`flex-1`}>
            {/* Modal */}
            {showAlert ? (<Modal
                animationType="slide"
                transparent={true}
                
                
            >
               
                <View style={tw`flex-1 justify-center rounded-2xl items-center bg-[rgba(0,0,0,0.5)]`}>
                   
                    <View style={[
                        { height: hp(30), width: wp(60) },
                        tw`bg-white rounded-lg  items-center py-8`
                    ]}>
                        <Exclamation />
                        <Text style={[tw`text-xl mt-5 mb-5 text-neutral-800`, { fontSize: hp(1.9) }]}>{text}</Text>
                        <TouchableOpacity onPress={() => setShowAlert(false)} style={[{ height: hp(5), width: wp(18), paddingVertical: hp(1), paddingHorizontal: hp(3) }, tw`bg-orange-400 rounded-lg`]}>
                            <Text style={[{ fontSize: hp(2) }, tw`text-white`]}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>) : (<></>)}
        </View>
    );
}
