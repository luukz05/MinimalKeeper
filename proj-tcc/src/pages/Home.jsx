import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import WebsiteButton from '../components/WebsiteButton';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const apiUrl = "http://192.168.15.2:3000/api/post";
  const [data, setData] = useState([]);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#242424' : '#eee' }]}>
      <Image
        source={{ uri: "https://cdn.discordapp.com/attachments/1168602368766648380/1180167559601987654/favicon.png?ex=657c6fb0&is=6569fab0&hm=b3ba119ed701aa2992e50c2118d1fca6cfdfe7fb270f0d22be3514e9ae276c37&" }}
        style={[styles.logo, { backgroundColor: isDarkMode ? '#eee' : '#eee' }]}
      />
      <View style={[styles.square, { borderColor: isDarkMode ? '#666' : '#000000' }]}>
        <Text style={[styles.boldText, { color: isDarkMode ? '#eee' : '#000000' }]}>Passwords in Vault</Text>
        <Text style={[styles.largeText, { color: isDarkMode ? '#eee' : '#000000' }]}>{data.length}</Text>
        <Text></Text>
      </View>

      <View style={[styles.passwordContainer, { borderColor: isDarkMode ? '#666' : '#000000' }]}>
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

      <View style={{ alignItems: "center" }}>
        <Text style={[styles.boldText, { color: isDarkMode ? '#eee' : '#000000' }]}>Other password testers:</Text>
        <WebsiteButton websiteUrl={"https://password.kaspersky.com/"} ButtonName={"Kaspersky Password Checker"} />
        <WebsiteButton websiteUrl={"https://www.passwordmonster.com/"} ButtonName={"Password Monster"} />
        <WebsiteButton websiteUrl={"https://www.security.org/how-secure-is-my-password/#:~:text=A%20password%20should%20be%2016,letters%2C%20numbers%2C%20and%20characters."} ButtonName={"Security.org"} />
        <WebsiteButton websiteUrl={"https://nordpass.com/secure-password/"} ButtonName={"NordVPN Password Tester"} />
      </View>
      <View style={{ alignItems: "center" }}>
            <Text style={styles.boldText}>Cybersecurity Videos and Articles</Text>
            <WebsiteButton websiteUrl={"https://youtube.com/playlist?list=PLEiEAq2VkUUJfPOj5nRounXvf3n17PCft&si=eNR95nHp7UD_sppr"} ButtonName={"Cyber Security Playlist [2024 Updated] 🔥 - Course"} />
            <WebsiteButton websiteUrl={"https://www.gartner.com/smarterwithgartner/5-must-read-ransomware-and-cybersecurity-articles"} ButtonName={"10 Must-Read Articles on Cybersecurity"} />
            <WebsiteButton websiteUrl={"https://www.wired.com/tag/cybersecurity/"} ButtonName={"Latest Cybersecurity News & Articles"} />
            <WebsiteButton websiteUrl={"https://youtube.com/playlist?list=PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII&si=G4nnb5wjM3fFquK9"} ButtonName={"Cryptography & Network Security"} />
            <WebsiteButton websiteUrl={"https://youtube.com/playlist?list=PLU89Q6KKRwdHBqA3UdXKi58Zb6zUUbaZ_&si=rVdADGcUq5NKaF2k"} ButtonName={"Cryptography History"} />
          </View>
    </ScrollView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  square: {
    width: "90%",
    height: 175,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf:"center"
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    marginTop:20
  },
  largeText: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
  },
  passwordContainer: {
    justifyContent: "space-evenly",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
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
    color: '#000000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
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
  square: {
    width: "90%",
    height: 175,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: '#666',
    alignSelf:"center"
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    color: '#eee',
    marginTop:20
  },
  largeText: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#eee',
  },
  passwordContainer: {
    justifyContent: "space-evenly",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    borderColor: '#666',
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
});
