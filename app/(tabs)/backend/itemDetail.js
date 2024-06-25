import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { api } from '../../../hooks/API';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

export default function itemDetail() {
  let params = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [currentStatus, setCurrentStatus] = useState(params.status);
  const [responseText, setResponseText] = useState(params.response);
  const [tickets, setTickets] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const getStatusButtonStyle = (status) => ({
    backgroundColor: currentStatus === status ? '#0a7ea4' : 'black',
    borderRadius: 6,
    padding: 6,
  });

  const updateStatus = async() =>{
    try {
        let changes = {
            status: currentStatus,
            response: responseText, 
            id: params.id
        };
        const response = await api.post('/updateTicket', changes);
        setTickets(response.data);
        if (response.status === 201) {
            router.back();
        }
      } catch (error) {
        console.error('Error occurred:', error.message);
      }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 6, padding: 4 }}>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketText}>Ticket No. {params.id}</Text>
            <Text style={styles.statusText}>Status: {currentStatus}</Text>
          </View>
          <Text>{params.description}</Text>
          <Text>Created: {new Date(params.inserted).toDateString()}</Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.thumbnail} source={{ uri: `http://3.97.243.202:3000/uploads/${params.imgPath}` }} />
          </TouchableOpacity>

          <TextInput 
            multiline={true} 
            numberOfLines={3} 
            onChangeText={setResponseText} 
            value={responseText} 
            style={styles.textInput} 
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={getStatusButtonStyle('New')} onPress={() => setCurrentStatus('New')}>
              <Text style={{ color: 'white' }}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getStatusButtonStyle('In Progress')} onPress={() => setCurrentStatus('In Progress')}>
              <Text style={{ color: 'white' }}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getStatusButtonStyle('Resolved')} onPress={() => setCurrentStatus('Resolved')}>
              <Text style={{ color: 'white' }}>Resolved</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={updateStatus}
            style={styles.saveButton}
          >
            <Text style={{ color: 'white', paddingVertical: 6 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: `http://3.97.243.202:3000/uploads/${params.imgPath}` }} style={styles.modalImage} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#3d3d3d',
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: 'white',
    paddingLeft: 10,
    paddingTop: 6,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  thumbnail: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#3d3d3d',
    borderRadius: 6,
    color: 'white',
    height: 100,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 6,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex:999
  },
  closeButtonText: {
    color: 'black',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
