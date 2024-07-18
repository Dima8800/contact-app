import { View, Text, Button, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import Contacts from 'react-native-contacts';


export default function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Контакты</Text>
      </View>
      <ContacatComponent/>
    </SafeAreaView>
  );
}

const ContacatComponent = ({name, phoneNumber}) => {
return(
  <View style={styles.contact}>
        <Text style={[styles.text]}> Имя контакта: {"\n"} {name}</Text>
        <Text style={[styles.text]}> Номер контака: {"\n"} {phoneNumber}</Text>
  </View>
);
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  container: {
    marginTop: "7%",
    padding: "1%",
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
  marginTop: "5%",
  backgroundColor: "#E1E1E1",
  padding: "3%"
 },
 text: {
  fontSize: 16,
  color: "#1B1B1B"
 },
});