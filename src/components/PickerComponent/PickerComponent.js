/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const PickerComponent = props => {
  const {name, listValue} = props;
  return (
    <View>
      <Text style={styles.label}>{name}</Text>
      <View style={styles.input}>
        <Picker {...props}>
          {listValue.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerComponent;

const styles = StyleSheet.create({
  label: {
    marginVertical: '1%',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
