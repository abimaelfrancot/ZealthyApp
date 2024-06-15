import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { api } from '../../../hooks/API';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

export default function itemDetail() {
  let params = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [currentStatus, setCurrentStatus] = useState(params.status);
  const [responseText,setResponseText]=useState(params.response)
  const [tickets, setTickets] = useState();

console.log(params.response)

  const getStatusButtonStyle = (status) => ({
    backgroundColor: currentStatus === status ? '#0a7ea4' : 'black',
    borderRadius: 6,
    padding: 6,
  });

  const updateStatus = async() =>{
    try {
        let changes = {
            status:currentStatus,
            response:responseText,id:params.id
        }
        const response = await api.post('/updateTicket',changes);
        setTickets(response.data);
        if (response.status === 201) {
            router.back()
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Error occurred:', error.message);
        } else {
          console.error('Error occurred:', error.message);
        }
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
          <Text>Description: {params.description}</Text>
          <Text>Created: {new Date(params.inserted).toDateString()}</Text>
          <Image style={{ height: 200, width: 300 }} source={{ uri: `http://3.97.243.202:3000/uploads/${params.imgPath}` }} />
          <Text>Response</Text>
          <TextInput multiline={true} numberOfLines={3} onChangeText={setResponseText} value={responseText} style={{ backgroundColor: '#3d3d3d', borderRadius: 6, color: 'white' }} />
          <Text>New Status:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={getStatusButtonStyle('New')} onPress={() => setCurrentStatus('New')}><Text style={{ color: 'white' }}>New</Text></TouchableOpacity>
            <TouchableOpacity style={getStatusButtonStyle('In Progress')} onPress={() => setCurrentStatus('In Progress')}><Text style={{ color: 'white' }}>In Progress</Text></TouchableOpacity>
            <TouchableOpacity style={getStatusButtonStyle('Resolved')} onPress={() => setCurrentStatus('Resolved')}><Text style={{ color: 'white' }}>Resolved</Text></TouchableOpacity>
          </View>
          <TouchableOpacity 
          onPress={updateStatus}
          style={{ backgroundColor: '#0a7ea4', borderRadius: 6, marginTop: 6, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: 'white', paddingVertical: 6 }}>Save</Text></TouchableOpacity>
        </View>
      </ScrollView>
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
});

