import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { createContext, useState, useContext, useEffect } = require("react");

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [ user, setUser ] = useState(null);
    
    const [ isAuthenticated, setIsAuthenticated ] = useState("");

    const [theme, setTheme ] = useState('light');
    console.log("auth:", auth)

    useEffect(() => {
        const loadTheme = async() => {
            const preThemed = await AsyncStorage.getItem('theme');
            if(preThemed) {
                setTheme(preThemed)
            }
        }
        loadTheme();
    },[])

    useEffect(() => {
        const saveTheme = async() => {
            await AsyncStorage.setItem('theme', theme);
        }
        saveTheme();
    }, [theme]);

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, (user) => {
        // console.log("User: ", user)
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUser(user.uid);
                // userIsOnline(user.uid)
            }else{
                setIsAuthenticated(false);
                setUser(null);
                
            }
       });
       return unsub;
    },[])

    // const userIsOnline = async(userId) => {
    //     const userRef = doc(db, "users", userId);
    //     await updateDoc(userRef, {online: 'true'});
    //     const docSnap =await getDoc(userRef);
    //     if(docSnap.exists()) {
    //         const data = docSnap.data();
    //         console.log("data:", data)
    //         setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId, online: data.online}) 
    //     }
    // }

    const updateUser = async(userId) => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {online: 'true'});
        const docSnap =await getDoc(userRef);
        if(docSnap.exists()) {
            const data = docSnap.data();
            console.log("data:", data)
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId, online: data.online}) 
        }
    }

    const login = async(email, password) => {
        try{
            let response = await signInWithEmailAndPassword(auth, email, password);
            
            return {success: true, response}
        }catch(e) {
            let message = e.message;
            console.log(message)
            if(message.includes('(auth/invalid-email)')) msg = "Invalid Email!";
            if(message.includes('(auth/network-request-failed)')) msg = "Network issues!";
            if(message.includes('(auth/invalid-credential)')) msg = "Incorrect email or password!";
            
            return {success: false, msg}
        }
    }

    const logout = async() => {
        try{
            console.log("Auth:", auth)
            await signOut(auth);
          
            return {success: true}
        }catch(e) {
            return {success: false, msg: e.message, error: e}
        }
    }

    const register = async( email, password, username, profileUrl ) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response.user:", response?.user );

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid,
            });
            return {success: true, data: response?.user}
        }catch(e) {
            console.log(e)
            let message = e.message;
            if(message.includes('(auth/invalid-email)')) msg = "Invalid Email!";
            if(message.includes('(auth/network-request-failed)')) msg = "Network issues!";
            if(message.includes('(auth/email-already-in-use)')) msg = "Your email is already in used!";
            return {success: false, msg}
        }
    }

    
    

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, theme, setTheme }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value) {
        throw new Error("useAuth must be wrapped in AuthContexProvider")
    }
    return value;
}