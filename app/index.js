import { StatusBar } from 'expo-status-bar';
import React from 'react';
import tw from "twrnc"

 
import { ActivityIndicator, Text, View } from 'react-native';

export default function startPage() {
  return (
  
   <View style={tw`flex-1 items-center justify-center`}>
      <ActivityIndicator size="large" color="gray" />
      <StatusBar style="auto" />
    </View>
  );
}