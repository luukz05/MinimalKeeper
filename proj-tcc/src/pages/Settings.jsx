// SettingsPage.js
import React from 'react';
import { View, TouchableOpacity, Text,Switch, Image, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { useState } from 'react';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isEnabledS, setIsEnabledS] = useState(true);
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: isDarkMode ? '#242424' : '#eee' }}>
      <Image source={{ uri: "https://cdn.discordapp.com/attachments/1168602368766648380/1180167559601987654/favicon.png?ex=657c6fb0&is=6569fab0&hm=b3ba119ed701aa2992e50c2118d1fca6cfdfe7fb270f0d22be3514e9ae276c37&" }} style={styles.logo} />
      <View style={{flexDirection:"row", justifyContent: 'space-between', alignItems:"center", marginLeft:20, marginRight:20}}>
        <Text style={{color:isDarkMode ? '#fff' : '#000000'}}>Dark Mode</Text>
        <Switch
            trackColor={{ false: '#A21919', true: '#34A219' }}
            thumbColor={isEnabledS ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
      </View>
      <Text style={{color:isDarkMode ? '#5e5e5e' : '#8b8b8b', alignSelf:"center", marginBottom: 80}}>Android Build 1.0</Text>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  logo: {
    height: 250,
    width: 250,
    alignSelf: "center",
    marginTop: 80,
    borderRadius: 15,
    backgroundColor: '#eee',
  }
});

const darkStyles = StyleSheet.create({
  logo: {
    height:250,
    width: 250,
    alignSelf: "center",
    marginTop: 80,
    borderRadius: 15,
    backgroundColor: '#eee',
  }
});



export default Settings;
