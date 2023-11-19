import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const notificationOptions = [
  { label: 'Notifications for Watering Schedule', value: 'Watering' },
  { label: 'Notifications for plant Humidity', value: 'Humidity' },
  { label: 'Notifications for plant Temperature', value: 'Temperature' },
  { label: 'Notifications for plant Light', value: 'Light' },
];

const NotificationsSettings = ({ onSelectedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleOption = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const renderSelectedOptions = () => {
    const selectedOptionLabels = selectedOptions.map((option) =>
      notificationOptions.find((item) => item.value === option).label
    );
    const displayText =
      selectedOptions.length > 0
        ? selectedOptionLabels.map((label) => label.split(' ').pop()).join(' - ')
        : (
          <Text style={{ color: 'gray' }}>
            Select notification options...
          </Text>
        );
        
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.renderOptions}>{displayText}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    onSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  const renderOptionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        toggleOption(item.value);
      }}
    >
      <View style={styles.optionItem}>
        <CheckBox
          value={selectedOptions.includes(item.value)}
          onValueChange={() => toggleOption(item.value)}
        />
        <Text style={styles.optionLabel}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {renderSelectedOptions()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.options}>
            <FlatList
              data={notificationOptions}
              renderItem={renderOptionItem}
              keyExtractor={(item) => item.value}   
            />
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closingTag}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    renderOptions: {
        padding: 10,
      },
      optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
      },
      optionLabel: {
        fontSize: 16,
        marginLeft: 8,
      },
      options: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 0,
        width: '83%',
        height: '37%',
        elevation: 16
      },
      closingTag: {
        fontWeight: '600',
        fontSize: 18,
        color: 'rgb(230, 101, 92)',
        backgroundColor: 'rgb(255, 251, 251)',
        borderColor: 'rgb(230, 101, 92)',
        borderStyle: 'solid',
        textAlign: 'center',
        margin: 12,
        padding: 6,
        borderWidth: 2,
        borderRadius: 6,
        elevation: 64,
        shadowColor: 'black',
      },
});

export default NotificationsSettings;