import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { con } from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';

import phoneImage from './assets/phone.png';
import messageImage from './assets/message.png';

export default function App() {
  const [contacts, setContacts] = useState([]);
  useState(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
    })
    .then((res) => {
        console.log('Permission: ', res);
        
        con.getAll()
            .then((contacts) => {
                // work with contacts
                setContacts(contacts);
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch((error) => {
        console.error('Permission error: ', error);
    });
}, []);

  console.log(contacts)

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Контакты</Text>
      </View>
      {contacts.map((contact, index) => (
        <ContactComponent key={index} name={contact.displayName} phoneNumber={contact.phoneNumbers[0].number} />
      ))}
    </SafeAreaView>
  );
}

const ContactComponent = ({name, phoneNumber}) => {
return(
  <View style={styles.contact}>
        <Text style={[styles.text, styles.name]}>{name}</Text>
        <View style={styles.contactInfo}>
        <Text style={[styles.text, styles.phone]}>{phoneNumber}</Text>
        <View style={styles.buttonContainer}>
          <CustomButton onPress={() => console.log("Button 2 pressed")} imageSource={messageImage} />
          <CustomButton onPress={() => console.log("Button 2 pressed")} imageSource={phoneImage} />
        </View>
      </View>
  </View>
);
}

const CustomButton = ({ onPress, imageSource }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={imageSource} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  container: {
    marginTop: "7%",
    padding: "2.5%",
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: "5%",
    fontSize: 26,
    fontWeight: 'bold',
    color: "#1B1B1B"
 },
 contact: {
  borderWidth: 3.5,
  borderColor: 'blue',
  borderRadius: 25,
  marginTop: "2%",
  margin: "2%",
  backgroundColor: "#EEEEEE",
  padding: "3%"
 },
 text: {
  color: "#1B1B1B"
 },
 name: {
  fontSize: 20,
  fontWeight: "bold"
 },
 phone: {
  fontWeight: "bold"
 },
 contactInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
 buttonContainer: {
  flex: 1,
  marginLeft: "20%",
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: "3%",
  alignItems: 'center',
},
buttonIcon: {
  width: 25,
  height: 25,
  resizeMode: 'contain',
},
});