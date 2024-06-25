import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { api } from '../../../hooks/API';
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const response = await api.get('/getTickets');
      setTickets(response.data);
      if (response.status === 201) {
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error occurred:', error.message);
      } else {
        console.error('Error occurred:', error.message);
      }
    }
  };

  useEffect(() => {
    getTickets();
  }, [isFocused]);

  const goToDetails = (content) => {
    router.push({
      pathname: 'backend/itemDetail',
      params: content
    });
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Resolved':
        return '#4CAF50';
      case 'In Progress':
        return '#FFC107';
      case 'new':
        return '#F44336';
      default:
        return '#FFFFFF';
    }
  };

  const Item = ({ content }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => { goToDetails(content); }}>
        <Text style={[styles.title, { flex: 1, textAlign: 'left' }]}>{content.id}</Text>
        <View style={{ flex:6 }}>
          <Text style={styles.description}>{content.name}</Text>
          <Text style={styles.descriptionb}>{content.emailaddress}</Text>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: getStatusBackgroundColor(content.status) }]}>
          <Text style={styles.statusText}>{content.status}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.arrowIcon} />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <Item content={item} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ justifyContent: 'center', paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: '500' }}>Tickets</Text>
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ marginTop: 20, marginBottom: 18 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
    paddingBottom: 120
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    fontWeight:'600',
    color: 'white',
    paddingTop: 2
  },
  descriptionb: {
    fontSize: 14,
    color: 'white',
    paddingTop: 2
  },
  statusContainer: {
    alignSelf: 'center',
    marginHorizontal: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  statusText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  arrowIcon: {
    marginLeft: 'auto',
    marginRight: 10,
  },
});
