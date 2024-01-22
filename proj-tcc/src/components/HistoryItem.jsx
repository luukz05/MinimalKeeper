import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../components/ThemeContext";

export default function PasswordItem({ data, saveItem, copyPassword,indice }) {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={{ alignItems:"center", flexDirection:"row",  justifyContent:"space-around", gap:10 }}>
        <Text style={{color: isDarkMode? "#eee" :"#000000"}}>{indice}</Text>
      <View style={styles.pressable}>
        <Text style={styles.passwordText}>{data}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={copyPassword}>
            <Ionicons size={20} color={styles.buttonIconColor} name="copy" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveItem}>
            <Ionicons size={20} color={styles.buttonIconColor} name="save" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  pressable: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  passwordText: {
    color: "#000",
  },
  buttonIconColor: "#0e0e0e",
});

const darkStyles = StyleSheet.create({
  pressable: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    backgroundColor: "#242424",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderColor: "#555",
    borderWidth: 1,
  },
  passwordText: {
    color: "#eee",
  },
  buttonIconColor: "#eee",
});
