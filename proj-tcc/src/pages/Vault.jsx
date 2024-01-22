import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import PasswordItem from '../components/PasswordItem';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import { useTheme } from '../components/ThemeContext';

export function Vault() {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [objectIdToDelete, setObjectIdToDelete] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [deletingAllPasswords, setDeletingAllPasswords] = useState(false);

  const apiUrl = 'http://192.168.15.2:3000/api/post';

  useEffect(() => {
    fetchData();
  }, [data]);

  async function HandleSetModal(item) {
    setObjectIdToDelete(item.id);
    setModalVisible(true);
  }

  async function handleCopyPassword(item) {
    await Clipboard.setStringAsync(item);
  }

  const DeleteSpecificData = async (objectId) => {
    const apiUrlForObject = `${apiUrl}/${objectId}`;
    console.log('Deleting object with ID:', objectId);
    try {
      const response = await axios.delete(apiUrlForObject);
      setModalVisible(false);
      if (response.status === 200) {
        console.log('Object deleted successfully:', response.data);
        fetchData();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const DeleteAllData = async () => {
    setConfirmDeleteModalVisible(true);
  };

  const handleConfirmDeleteAll = async () => {
    try {
      setDeletingAllPasswords(true);
  
      // Simulate a delay of 2 seconds (adjust as needed)
      await new Promise((resolve) => setTimeout(resolve, 2500));
  
      const response = await axios.delete(apiUrl);
      setConfirmDeleteModalVisible(false);
  
      if (response.status === 200) {
        console.log(response.data);
        fetchData();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setDeletingAllPasswords(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <PasswordItem
        data={item.CONTENT.toString()}
        removePassword={() => HandleSetModal(item)}
        copyPassword={() => handleCopyPassword(item.CONTENT)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Passwords: {data.length}</Text>
        <TouchableOpacity onPress={DeleteAllData}>
          <Text style={styles.deleteAllText}>Delete All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordListContainer}>
        <FlatList inverted data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
      </View>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deseja excluir a senha?</Text>
            <Text style={styles.modalSubtitle}>Essa ação não pode ser desfeita</Text>
            <View style={styles.buttonArea}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={{ color: isDarkMode ? '#ffffff' : '#0e0e0e' }}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={() => DeleteSpecificData(objectIdToDelete)}>
                <Text style={[styles.modalButtonText, { color: isDarkMode ? '#0e0e0e' : '#ffffff' }]}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={confirmDeleteModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalSubtitle}>This action cannot be undone</Text>
            <View style={styles.buttonArea}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setConfirmDeleteModalVisible(false)}>
                <Text style={{ color: isDarkMode ? '#ffffff' : '#0e0e0e' }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleConfirmDeleteAll}
                disabled={deletingAllPasswords}>
                <Text style={[styles.modalButtonText, { color: isDarkMode ? '#0e0e0e' : '#ffffff' }]}>
                  {deletingAllPasswords ? 'Deleting...' : 'Yes'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee', // Set the background color for the entire component
  },
  header: {
    backgroundColor: '#rgba(24,24,fff,0.6)',
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
  },
  deleteAllText: {
    color: '#000000',
  },
  passwordListContainer: {
    marginTop: 50,
  },
  modalContainer: {
    backgroundColor: 'rgba(24,24,24,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
    marginBottom: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    gap: 50,
  },
  modalButton: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  modalButtonSave: {
    backgroundColor: '#0e0e0e',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#eee',
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323', // Set the background color for the entire component
  },
  header: {
    backgroundColor: '#232323',
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
  },
  deleteAllText: {
    color: '#ffffff',
  },
  passwordListContainer: {
    marginTop: 50,
  },
  modalContainer: {
    backgroundColor: 'rgba(24,24,24,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#2e2e2e',
    width: '85%',
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    gap: 50,
  },
  modalButton: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  modalButtonSave: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
