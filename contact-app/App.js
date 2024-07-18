import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';

import phoneImage from './assets/phone.png';
import messageImage from './assets/message.png';

export default function App() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          setContacts(data)
          console.log(contact);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Контакты</Text>
      </View>
      {contacts.map((contact, index) => (
  <ContactComponent key={index} name={contact.displayName} phoneNumber={contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : 'Номер телефона не найден'} />
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