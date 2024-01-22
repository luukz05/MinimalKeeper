import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Switch, FlatList } from "react-native";
import { ModalPassword } from "../components/ModalPassword";
import Slider from "@react-native-community/slider";
import * as Clipboard from "expo-clipboard";
import HistoryItem from "../components/HistoryItem";
import axios from "axios";
import { useTheme } from '../components/ThemeContext';

const charsetNormal = "abcdefghijklmnopqrstuvwxyz";
const charsetCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsetSymbol = "`~!@#$%^&*()_+-=[]{};':,.<>/?|";
const charsetNumber = "123456789012345678901234567890";

export function Generator() {
  const [size, setSize] = useState(8);
  const [quantity, setQuantity] = useState(1);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [selectedHistoryPassword, setSelectedHistoryPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabledS, setIsEnabledS] = useState(true);
  const [isEnabledNUM, setIsEnabledNUM] = useState(true);
  const [isEnabledC, setIsEnabledC] = useState(true);
  const [passwordHistory, setpasswordHistory] = useState([]);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const toggleSwitchS = () => setIsEnabledS((prev) => !prev);
  const toggleSwitchNUM = () => setIsEnabledNUM((prev) => !prev);
  const toggleSwitchC = () => setIsEnabledC((prev) => !prev);

  const generatePassword = () => {
    let selectedCharset = charsetNormal;

    if (isEnabledS) {
      selectedCharset += charsetSymbol;
    }

    if (isEnabledNUM) {
      selectedCharset += charsetNumber;
    }

    if (isEnabledC) {
      selectedCharset += charsetCapital;
    }

    const generatedPasswords = [];
    // 
    for (let j = 0; j < quantity; j++) {
      let password = "";
      for (let i = 0, n = selectedCharset.length; i < size; i++) {
        password += selectedCharset.charAt(Math.floor(Math.random() * n));
      }
      generatedPasswords.push(password);
    }

    setGeneratedPassword(generatedPasswords.join('\n'));
    setSelectedHistoryPassword(""); // Reset selected history password when generating a new one
    setModalVisible(true);
    setpasswordHistory((prevHistory) => [...prevHistory, ...generatedPasswords]);
  };

  async function handleCopyPassword(item) {
    await Clipboard.setStringAsync(item);
  }

  // const apiUrl = "http://192.168.15.2:3000/api/post";

  // // const fetchData = async (item) => {
  // //     try {
  // //       const newItem = { Content: item };
  // //       const response = await axios.post(apiUrl, newItem);

  // //       if (response.status === 200) {
  // //         console.log(response.data);
  // //       } else {
  // //         console.error('Error:', response.status);
  // //       }
  // //     } catch (error) {
  // //       console.error('Error:', error);
  // //     }
  // //   };


  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://cdn.discordapp.com/attachments/1168602368766648380/1180167559601987654/favicon.png?ex=657c6fb0&is=6569fab0&hm=b3ba119ed701aa2992e50c2118d1fca6cfdfe7fb270f0d22be3514e9ae276c37&" }} style={styles.logo} />
      <View style={styles.containerToggle}>
        <View>
          <Text style={{ fontWeight: "bold", color: styles.textColor }}>Uppercase</Text>
          <Switch
            trackColor={{ false: '#A21919', true: '#34A219' }}
            thumbColor={isEnabledC ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchC}
            value={isEnabledC}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: styles.textColor }}>Numbers</Text>
          <Switch
            trackColor={{ false: '#A21919', true: '#34A219' }}
            thumbColor={isEnabledNUM ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNUM}
            value={isEnabledNUM}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold", color: styles.textColor }}>Symbols</Text>
          <Switch
            trackColor={{ false: '#A21919', true: '#34A219' }}
            thumbColor={isEnabledS ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchS}
            value={isEnabledS}
          />
        </View>
      </View>

      <Text style={{ ...styles.title, color: styles.textColor }}>Password Length: {size} Characters</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={8}
          maximumValue={20}
          thumbTintColor={styles.sliderThumbColor}
          maximumTrackTintColor={styles.sliderMaximumTrackColor}
          minimumTrackTintColor={styles.sliderMinimumTrackColor}
          value={parseFloat(size)} // Parse size to float
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={{ ...styles.buttonText, color: styles.buttonTextColor }}>Generate</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword
          password={selectedHistoryPassword || generatedPassword} // Show selected history password if available, otherwise show generated password
          handleClose={() => setModalVisible(false)}
        />
      </Modal>

      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, marginTop: 15, color: styles.textColor }}>Password History</Text>
        <FlatList
          inverted
          data={passwordHistory}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (
            <HistoryItem
              key={index.toString()}
              indice={index + 1}
              data={item}
              copyPassword={() => handleCopyPassword(item)}
              saveItem={() => {
                setModalVisible(true);
                setSelectedHistoryPassword(item);
              }}
            />
          )}
        />
      </View>
    </View>
  );
}


const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#eee",
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "90%",
    borderRadius: 12,
    borderWidth: 1,
     borderColor: '#666',
    borderRadius: 10,
  },
  button: {
    padding: 10,
    width: "90%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
    backgroundColor: "#d6d4d4",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  containerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  textColor: "#000",
  buttonTextColor: "#000",
  sliderThumbColor: "#232323",
  sliderMinimumTrackColor: "#000000",
  sliderMaximumTrackColor: "#000000",
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#242424",
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "90%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
  },
  button: {
    padding: 10,
    width: "90%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
    backgroundColor: "#232323",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  containerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  textColor: "#ffffff",
  buttonTextColor: "#ffffff",
  sliderThumbColor: "#ffffff",
  sliderMinimumTrackColor: "#ffffff",
  sliderMaximumTrackColor: "#ffffff",
});
