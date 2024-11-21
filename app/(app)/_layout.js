import { Stack } from "expo-router";

import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/authContext";

export default function _layout() {
    const {theme , setTheme} = useAuth();
    return (
        <Stack>
            <Stack.Screen 
            
            name="home"
            
            options={{
                
                header: ()=> <Header />,
             
            }}
            />
        </Stack>
    )
}