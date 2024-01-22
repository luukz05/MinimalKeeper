import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook

export default function PasswordItem({ data, removePassword, copyPassword }) {
  const { isDarkMode } = useTheme(); // Get the current theme mode
  const styles = isDarkMode ? darkStyles : lightStyles; // Use the appropriate styles based on the theme

  return (
    <View style={{alignItems:"center"}}>
        <View style={styles.pressable}>
        <Text style={{color: isDarkMode? "#eee" :"#000000"}}>{data}</Text>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={copyPassword}>
            <Ionicons size={20} color={isDarkMode ? '#fff' : '#0e0e0e'} name="copy" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={removePassword}>
            <Ionicons size={20} color={isDarkMode ? '#fff' : '#0e0e0e'} name="trash" />
            </TouchableOpacity>
        </View>
        </View> 
    </View>
    
  );
}

const commonStyles = {
  pressable: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  pressable: {
    ...commonStyles.pressable,
    borderColor: '#ccc', // Light mode border color
  },
  button: {
    ...commonStyles.button,
    borderColor: '#ccc', // Light mode border color
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  pressable: {
    ...commonStyles.pressable,
    borderColor: '#666', // Dark mode border color
    backgroundColor: '#232323', // Dark mode background color
  },
  button: {
    ...commonStyles.button,
    borderColor: '#666', // Dark mode border color
    backgroundColor: '#232323', // Dark mode background color
  },
});
