import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, ScrollView } from "react-native";
import WebsiteButton from "../components/WebsiteButton";
import { useTheme } from '../components/ThemeContext';

export default function Checker() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [hidePassword, setHidePassword] = useState(false);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const handlePassword = (passwordValue) => {
    const strengthChecks = {
      length: passwordValue.length >= 8,
      hasUpperCase: /[A-Z]+/.test(passwordValue),
      hasLowerCase: /[a-z]+/.test(passwordValue),
      hasDigit: /[0-9]+/.test(passwordValue),
      hasSpecialChar: /[^A-Za-z0-9]+/.test(passwordValue),
    };

    const verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength;

    if (verifiedList.length === 5) {
      strength = "Very Strong";
    } else if (verifiedList.length === 4) {
      strength = "Strong";
    } else if (verifiedList.length === 3) {
      strength = "Medium";
    } else if (verifiedList.length === 2) {
      strength = "Weak";
    } else {
      strength = "Very Weak";
    }

    setPassword(passwordValue);
    setProgress((verifiedList.length / 5) * 100);
    setMessage(strength);
  };

  const getActiveColor = (type) => {
    if (type === "Very Strong") return "#2AFF00";
    if (type === "Strong") return "#A3F400";
    if (type === "Medium") return "#FFD500";
    if (type === "Weak") return "#FF9300";
    if (type === "Very Weak") return "#FF0000";
  };

  return (
    <ScrollView>
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#242424' : '#eee' }]}>
          <View style={styles.passwordSectionContainer}>
            <View style={styles.passwordSection}>
              <Text style={styles.passwordTitle}>Weak Passwords</Text>
              <Text style={styles.passwordText}>Password123</Text>
              <Text style={styles.passwordText}>123456</Text>
              <Text style={styles.passwordText}>qwerty</Text>
              <Text style={styles.passwordText}>abc123</Text>
              <Text style={styles.passwordText}>letmein</Text>
              <Text style={styles.passwordText}>admin</Text>
              <Text style={styles.passwordText}>football</Text>
              <Text style={styles.passwordText}>111111</Text>
              <Text style={styles.passwordText}>password</Text>
              <Text style={styles.passwordText}>123456789</Text>
            </View>

            <View style={styles.passwordSection}>
              <Text style={styles.passwordTitle}>Strong Passwords</Text>
              <Text style={styles.passwordText}>P@ssw0rd!23</Text>
              <Text style={styles.passwordText}>Tr0ub@dor&3</Text>
              <Text style={styles.passwordText}>$ecureP@ssw0rd</Text>
              <Text style={styles.passwordText}>H1ghlySecur3!</Text>
              <Text style={styles.passwordText}>7r!ckyP@ssw0rd</Text>
              <Text style={styles.passwordText}>P@ssw0rd&Ch@ll3ng3</Text>
              <Text style={styles.passwordText}>XyZ$123!aB</Text>
              <Text style={styles.passwordText}>Qwerty!2#4</Text>
              <Text style={styles.passwordText}>Str0ngP@ss</Text>
              <Text style={styles.passwordText}>9a#P$w0rD2!</Text>
            </View>
          </View>
          
          <View style={[styles.card , {borderColor: '#666',}]}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Password Strength Checker</Text>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                  <TextInput
                    value={password}
                    onChangeText={(value) => handlePassword(value)}
                    secureTextEntry={hidePassword}
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor={isDarkMode ? '#888' : '#666'}
                  />
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={{
                      ...styles.progress,
                      width: `${progress}%`,
                      backgroundColor: getActiveColor(message),
                    }}
                  ></View>
                </View>

                {password.length !== 0 ? (
                  <Text
                    style={{
                      ...styles.message,
                      color: getActiveColor(message),
                    }}
                  >
                    Your password is {message}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.otherTesters}>
            <Text style={styles.boldText}>Other password testers:</Text>
            <WebsiteButton websiteUrl={"https://password.kaspersky.com/"} ButtonName={"Kaspersky Password Checker"} />
            <WebsiteButton websiteUrl={"https://www.passwordmonster.com/"} ButtonName={"Password Monster"} />
            <WebsiteButton websiteUrl={"https://www.security.org/how-secure-is-my-password/#:~:text=A%20password%20should%20be%2016,letters%2C%20numbers%2C%20and%20characters."} ButtonName={"Security.org"} />
            <WebsiteButton websiteUrl={"https://nordpass.com/secure-password/"} ButtonName={"NordVPN Password Tester"} />
          </View>
          
      </View>
    </ScrollView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: '#242424',
  },
  card: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: '#eee',
    marginTop:25, marginBottom:25,
    
  },
  cardHeader: {
    backgroundColor: "#eee",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  cardBody: {
    padding: 20
  },
  inputContainer: {
    marginBottom: 20,
    justifyContent:"center"
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 313
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#000',
    
  },
  progressBg: {
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    
  },
  progress: {
    height: "100%",
    borderRadius: 5,
  },
  message: {
    textAlign: "center",
  },
  passwordSectionContainer: {
    justifyContent: "space-evenly",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
    marginTop:40,
  },
  passwordSection: {
    padding: 20,
    borderRadius: 15,
    gap: 2,
  },
  passwordTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  passwordText: {
    textAlign: "center",
    color: '#000',
  },
  otherTesters: {
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: '#242424',
  },
  card: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: '#242424',
    marginTop:25, marginBottom:25
  },
  cardHeader: {
    backgroundColor: "#242424",
    padding: 10,
    
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: '#eee',
  },
  cardBody: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width:313
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#eee',
    borderColor: '#eee',
  },
  progressBg: {
    height: 10,
    backgroundColor: "#555",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    borderRadius: 5,
  },
  message: {
    textAlign: "center",
    color: '#eee',
  },
  passwordSectionContainer: {
    justifyContent: "space-evenly",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
     borderColor: '#666',
    marginTop:40,
  },
  passwordSection: {
    padding: 20,
    borderRadius: 15,
    gap: 2,
  },
  passwordTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    color: '#eee',
  },
  passwordText: {
    textAlign: "center",
    color: '#eee',
  },
  otherTesters: {
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: '#eee',
  },
});
