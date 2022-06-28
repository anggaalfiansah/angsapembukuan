/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {
  InputComponent,
  PickerComponent,
  DatePickerComponent,
} from '../../components';
import {PembukuanDataController} from '../../realm/controllers';
import {PembukuanDataModel} from '../../realm/models';

const FormTambahPembukuanItemScreen = ({route, navigation}) => {
  const {id_pembukuan} = route.params;

  const [date, set_date] = useState(new Date());
  const [type, set_type] = useState('income');
  const [value, set_value] = useState('');
  const [notes, set_notes] = useState('');

  const handleSubmit = async () => {
    const data = PembukuanDataModel.generate(
      id_pembukuan,
      new Date(date),
      type,
      parseInt(value, 10),
      notes,
    );
    try {
      const submit = await PembukuanDataController.createNewPembukuanData(data);
      if (submit.code === 200) {
        Alert.alert('Sukses', submit.message);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Gagal', error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <PickerComponent
        name={'Tipe'}
        mode={'dropdown'}
        listValue={[
          {label: 'Pemasukan', value: 'income'},
          {label: 'Pengeluaran', value: 'outcome'},
        ]}
        selectedValue={type}
        onValueChange={itemValue => set_type(itemValue)}
      />
      <DatePickerComponent
        name={'Tanggal'}
        value={date}
        onChangeText={text => set_date(text)}
      />
      <InputComponent
        name={'Nominal'}
        keyboardType={'numeric'}
        value={value}
        onChangeText={text => set_value(text)}
      />
      <InputComponent
        name={'Keterangan'}
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={text => set_notes(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormTambahPembukuanItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '5%',
  },
  button: {
    padding: '5%',
    backgroundColor: 'pink',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
  },
});
