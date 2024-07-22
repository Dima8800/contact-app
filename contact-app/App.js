import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image, Animated, TextInput, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';

import SettingsScreen from './src/SettingsScreen';

import phoneImage from './assets/phone.png';
import messageImage from './assets/message.png';
import settingsImage from './assets/settings.png';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({});
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderContact = ({ item }) => (
    <ContactComponent contacts={item} />
  );

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.body}>
      <Header/>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск контактов..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <AnimatedFlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const Header = ({}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [savedPhoneNumber, setSavedPhoneNumber] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSavePhoneNumber = (phoneNumber) => {
    setSavedPhoneNumber(phoneNumber);
    console.log(savedPhoneNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Контакты</Text>
        <CustomButton onPress={toggleModal} imageSource={settingsImage} />
      </View>
      <SettingsScreen visible={isModalVisible} onClose={() => setIsModalVisible(false)} onSavePhoneNumber={handleSavePhoneNumber} />
    </View>
  );
};

const ContactComponent = ({contacts}) => {
  return (
    <View style={styles.contact}>
      <Text style={[styles.text, styles.name]}> {contacts.name} </Text>
      <View style={styles.contactInfo}>
        {contacts.phoneNumbers && contacts.phoneNumbers.length > 0 ? (
          <Text style={[styles.text, styles.phone]}> {contacts.phoneNumbers[0].number} </Text>
        ) : (
          <Text style={[styles.text, styles.phone]}> Номер телефона отсутствует </Text>
        )}
        {contacts.phoneNumbers && contacts.phoneNumbers.length > 0 && (
          <View style={styles.buttonContainer}>
            <CustomButton onPress={() => console.log("Button 1 pressed")} imageSource={messageImage} />
            <CustomButton onPress={() => console.log("Button 2 pressed")} imageSource={phoneImage} />
          </View>
        )}
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
    margin: 20,
    alignItems: "center",
    justifyContent: 'flex-start'
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
searchInput: {
  backgroundColor: '#fff',
  padding: 10,
  margin: 10,
  borderRadius: 10,
},
headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});