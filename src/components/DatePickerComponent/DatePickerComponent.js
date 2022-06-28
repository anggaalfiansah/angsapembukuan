/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Fontisto';

const DatePickerComponent = props => {
  const {name, value, onChangeText, placeholder} = props;

  const [open, setOpen] = useState(false);
  return (
    <View>
      <Text style={styles.label}>{name}</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder ? placeholder : name}
          value={moment(value).format('DD/MM/YYYY')}
          editable={false}
        />
        <TouchableOpacity
          style={styles.button_date}
          onPress={() => setOpen(!open)}>
          <Icon style={styles.searchIcon} name="date" size={40} color="#000" />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        onConfirm={values => {
          setOpen(false);
          onChangeText(values);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
    </View>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  label: {
    marginVertical: '1%',
    fontWeight: '500',
  },
  input_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 17,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    width: '80%',
  },
  button_date: {width: '20%', alignItems: 'center'},
});
