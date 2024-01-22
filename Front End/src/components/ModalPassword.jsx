import {View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput} from "react-native"
import { useState } from "react";
import * as Clipboard from "expo-clipboard"
import { useTheme } from '../components/ThemeContext';
import axios from "axios";
import {Ionicons} from "@expo/vector-icons"
import PasswordItem from "./HistoryItem";

export function ModalPassword({ password, handleClose }) {
    const apiUrl = "http://192.168.15.2:3000/api/post";
    const [error, setError] = useState(null);
  
    async function handleCopyPassword() {
      try {
        await fetchData();
        handleClose();
      } catch (err) {
        setError("This password has already been saved in the vault");
      }
    }
  
    const { isDarkMode } = useTheme();
    const styles = isDarkMode ? darkStyles : lightStyles;
  
    const fetchData = async () => {
      try {
        const newItem = { Content: password };
        const response = await axios.post(apiUrl, newItem);
  
        if (response.status !== 200) {
          throw new Error('Unexpected response status: ' + response.status);
        }
  
        console.log(response.data);
        setError(null); // Reset error state on success
      } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error for handling in the calling function
      }
    };
  
    async function copyOnly() {
        if (password) {
          await Clipboard.setStringAsync(password);
        } else {
          console.error('Error: Password is null or undefined');
          // Handle the error or display a message to the user as needed
        }
      }
      
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Your Password:</Text>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Pressable style={styles.innerPassword}>
              <Text style={styles.text}>{password}</Text>
            </Pressable>
            <TouchableOpacity style={styles.Button} onPress={copyOnly}>
              <Ionicons size={20} color={isDarkMode ? "#ffffff" : "#0e0e0e"} name="copy" />
            </TouchableOpacity>
          </View>
          {error && <Text style={{ color: 'red', fontWeight:"bold", marginTop:5}}>{error}</Text>}
          <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={{ color: isDarkMode ? "#ffffff" : "#0e0e0e" }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        // <View style={styles.container}>
        //     <View style={styles.content}>
        //         <Text style={styles.title}>Your Password:</Text>
        //         <PasswordItem data={password}></PasswordItem>
        //     </View>
        // </View>
    );
  }

const lightStyles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(24,24,24,0.6)",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }, 
    Button:{
        padding:10,
        borderRadius:10,
        borderColor:"#ccc",
        borderWidth: 1,
    },
    content:{
        backgroundColor:"#fff",
        width:"85%",
        paddingTop:24,
        paddingBottom:24,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:8
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        color:"#000",
        marginBottom: 24,
    },
    innerPassword:{
        backgroundColor:"#0e0e0e",
        width:"75%",
        padding:14,
        borderRadius:8,
    },
    text:{
        color:"#fff",
        textAlign:"center",
        fontSize:18
    },
    buttonArea:{
        flexDirection:"row",
        gap:50
    },
    button:{
        marginTop:15,
        paddingTop:15,
        paddingBottom:15,
        paddingHorizontal:20,
        
    },
    buttonSave:{
        backgroundColor:"#0e0e0e",
        borderRadius:8,
        
    },
    TextInput:{
        backgroundColor:"#eee",
        padding:5,
        marginBottom:5,
        width:"90%",
        borderRadius:8
    }
})
const darkStyles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(24,24,24,0.6)",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }, 
    Button:{
        padding:10,
        borderRadius:10,
        borderColor:"#555",
        borderWidth: 1,
    },
    content:{
        backgroundColor:"#2e2e2e",
        width:"85%",
        paddingTop:24,
        paddingBottom:24,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:8
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        color:"#ffffff",
        marginBottom: 24,
    },
    innerPassword:{
        backgroundColor:"#000000",
        width:"75%",
        padding:14,
        borderRadius:8,
    },
    text:{
        color:"#fff",
        textAlign:"center",
        fontSize:18
    },
    buttonArea:{
        flexDirection:"row",
        gap:50
    },
    button:{
        marginTop:15,
        paddingTop:15,
        paddingBottom:15,
        paddingHorizontal:20,
        
    },
    buttonSave:{
        backgroundColor:"#0e0e0e",
        borderRadius:8,
        
    },
    TextInput:{
        backgroundColor:"#eee",
        padding:5,
        marginBottom:5,
        width:"90%",
        borderRadius:8
    }
})