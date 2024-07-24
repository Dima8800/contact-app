import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image, Animated, TextInput, ScrollView, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import { Alert } from 'react-native';

import SettingsScreen from './src/SettingsScreen';

import phoneImage from './assets/phone.png';
import messageImage from './assets/message.png';
import settingsImage from './assets/settings.png';
import MessageScreen from './src/MessageScreen';
import { requestPermission } from 'react-native-contacts';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPhoneNumber, setSavedPhoneNumber] = useState('');

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
    <ContactComponent contacts={item} savedPhoneNumber={savedPhoneNumber} />
  );

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.body}>
      <Header onSavePhoneNumber={setSavedPhoneNumber} />
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

const Header = ({ onSavePhoneNumber }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Контакты</Text>
        <CustomButton onPress={toggleModal} imageSource={settingsImage} />
      </View>
      <SettingsScreen 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onSavePhoneNumber={onSavePhoneNumber} // Передаем функцию в SettingsScreen
      />
    </View>
  );
};

const ContactComponent = ({ contacts, savedPhoneNumber }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageText, setMessageText] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOpenModal = () => {
    toggleModal();
  };

  const alerApp = ()=> {
    Alert.alert(
      "Ошибка",
      "Номер шлюза пуст. \n Укажите его в настройках приложения",
      [
        { text: "OK", onPress: () => setIsModalVisible(false) }
      ],
      { cancelable: false }
    );
  }

  const handleSendMessage = (text) => {
    setMessageText(text);

    if (savedPhoneNumber === "") {
      console.log("Сохраненный номер телефона пуст.");
      setIsModalVisible(false);
      alerApp;
      return;
    }

    // Формируем сообщение
    const message = `${contacts.phoneNumbers[0].number}* ${text}`;
    console.log(`Отправка сообщения на номер: ${savedPhoneNumber}, текст: ${message}`);
    
    sendMessage(savedPhoneNumber, message);
    toggleModal();
  };

  const bell = ()=> {
    if (savedPhoneNumber === "") {
      console.log("Сохраненный номер телефона пуст.");
      alerApp;
      return;
    }
    const message = `${contacts.phoneNumbers[0].number}#`;
    sendMessage(savedPhoneNumber, message);
  }

  const sendMessage = (phoneNumber, message) => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`; // Используем обратные кавычки
    Linking.openURL(url).catch((err) => console.error('Ошибка при открытии приложения сообщений:', err));
  };

  return (
    <View style={styles.contact}>
      <Text style={[styles.text, styles.name]}>
        {contacts?.name || 'Имя отсутствует'}
      </Text>
      <View style={styles.contactInfo}>
        {contacts?.phoneNumbers?.length > 0 ? (
          <Text style={[styles.text, styles.phone]}>
            {contacts.phoneNumbers[0].number}
          </Text>
        ) : (
          <Text style={[styles.text, styles.phone]}>Номер телефона отсутствует</Text>
        )}
        {contacts?.phoneNumbers?.length > 0 && (
          <View style={styles.buttonContainer}>
            <CustomButton onPress={handleOpenModal} imageSource={messageImage} />
            <CustomButton onPress={bell} imageSource={phoneImage} />
          </View>
        )}
      </View>
      <MessageScreen 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
        onSendMessage={handleSendMessage} 
      />
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