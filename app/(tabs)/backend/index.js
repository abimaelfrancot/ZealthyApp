import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity,FlatList } from "react-native";
import {api} from '../../../hooks/API'
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const [tickets,setTickets] = useState()

  const getTickets = async() =>{
    try {
    
    const response = await api.get('/getTickets')
    setTickets(response.data)
    if (response.status === 201) {
    }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error occurred:', error.message);
      } else {
        // Handle other errors
        console.error('Error occurred:', error.message);
      }
    }
  }

  useEffect(() => {
   getTickets()
  }, [isFocused]);

  const goToDetails = (content) =>{
    router.push({
      pathname: 'backend/itemDetail',
      params: content
    });
  }

  const Item = ({ content }) => {
    const truncatedDescription = content.description.length > 150 
      ? content.description.substring(0, 150) + '...' 
      : content.description;
  
    return (
      <TouchableOpacity style={styles.item} onPress={()=>{goToDetails(content)}}>
        <Text style={styles.title}>{content.id}</Text>
        <Text style={styles.description} numberOfLines={3}>{truncatedDescription}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{content.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  const renderItem = ({ item }) => <Item content={item} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{  justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop:70}}>
      <Text style={{fontSize:25,fontWeight:'500'}}>Tickets</Text>
      <FlatList
      data={tickets}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={{marginTop:20,marginBottom:18}}
    />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: 'center',
    padding: 20,
    marginTop:50,
    paddingBottom:120
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
    borderRadius:10,
  },
  title: {
    fontSize: 20,
    color:'white',
    paddingLeft:10,
    fontWeight:'600'
  },
  description: {
    fontSize: 14,
    color:'white',
    paddingLeft:10,
    paddingTop:6
  },
  statusContainer: {
    alignSelf: 'flex-start',
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  statusText: {
    color: 'black',
    fontWeight: '600',
  },
});
