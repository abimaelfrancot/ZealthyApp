import React, { useState } from 'react';
import { Image, StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import {api} from '../../hooks/API'

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const validationSchema = yup.object().shape({
  name: yup.string().required('Please Input a Name'),
  email: yup.string().email().matches(emailRegex,"Please Input a valid Email").required('Please Input a valid Email'),
  description: yup.string().required('Please Input a Description for your Issue'),
  image: yup.string()
});

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (values,{ resetForm }) => {

    values.image = selectedImage;
    try {
      const imgname = Date.now()
      const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      name: `${imgname}.jpeg`,
      type: 'image/jpeg',
    });
    formData.append('description', values.description);
    formData.append('email', values.email);
    formData.append('name', values.name);
    formData.append('img', `${imgname}.jpeg`);

    const response = await api.post('/createTicket', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your Ticket has been Submitted'
      });
      resetForm();
      setSelectedImage(null);
    }
    console.log('Response:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error occurred:', error.message);
      } else {
        console.error('Error occurred:', error.message);
      }
    }

  
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={{fontSize:25,fontWeight:'500'}}>Create a Ticket</Text>
      <KeyboardAwareScrollView >
        <Formik
          initialValues={{ name: '', email: '', image: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <Text style={styles.label}>Photo/Attachment:</Text>
              <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                <Text style={styles.imagePickerButtonText}>Select Image</Text>
              </TouchableOpacity>
              {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
              {touched.image && errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={[styles.input,{height:80}, touched.description && errors.description ? styles.inputError : null]}
                placeholder="Description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                multiline={true}
              />
              {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit Ticket</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Toast position='bottom'/>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: 'center',
    padding: 20,
    marginTop:50
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
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
  imagePickerButton: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  }
});
