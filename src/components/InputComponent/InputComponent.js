/* eslint-disable prettier/prettier */
import {StyleSheet, TextInput, Text, View} from 'react-native';
import React from 'react';

const InputComponent = props => {
  const {name, placeholder} = props;
  return (
    <View>
      <Text style={styles.label}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder ? placeholder : name}
        {...props}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  label: {
    marginVertical: '1%',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    padding: 17,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
});
