import React, { useState } from 'react';
import { Button, Modal, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

const MessageScreen = ({ visible, onClose, onSendMessage }) => {
    const [text, setText] = useState('');

    const handleSaveSettings = () => {
      console.log('Текст сообщения:', text);
      onSendMessage(text);
    };
    
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Введите текст сообщения"
            />
            <View>
              <TouchableOpacity style={styles.buttonSave} onPress={handleSaveSettings}>
                  <Text style={{ color: 'white' }}>Отправить сообщение</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={{ color: 'white' }}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
};
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    modalContent: {
      backgroundColor: '#fafafa',
      padding: 20,
      borderRadius: 15,
      elevation: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 15,
    },
    buttonSave:{
        backgroundColor:"green",
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        width: "100%",
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        backgroundColor:"red",
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: "100%",
        height: 35, 
        justifyContent: 'center',
        alignItems: 'center',
      }
  });

export default MessageScreen;