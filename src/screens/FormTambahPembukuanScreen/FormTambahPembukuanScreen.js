/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

// realm
import {PembukuanController} from '../../realm/controllers';
import {PembukuanModel} from '../../realm/models';

// components
import {InputComponent} from '../../components';

const FormTambahPembukuanScreen = ({navigation, route}) => {
  const {data, action} = route.params;
  const [name, set_name] = useState('');
  const [notes, set_notes] = useState('');

  useEffect(() => {
    switch (action) {
      case 'NEW':
        set_name('');
        set_notes('');
        navigation.setOptions({title: 'Tambah Pembukuan'});
        break;
      case 'EDIT':
        set_name(data.name);
        set_notes(data.notes);
        navigation.setOptions({title: 'Edit Pembukuan'});
        break;
    }
  }, [action]);

  const handleSubmit = async () => {
    switch (action) {
      case 'NEW':
        handleNew();
        break;
      case 'EDIT':
        handleEdit();
        break;
    }
  };

  const handleNew = async () => {
    try {
      const data_model = PembukuanModel.generate(name, notes);
      const submit = await PembukuanController.createNewPembukuan(data_model);
      if (submit.code === 200) {
        Alert.alert('Sukses', submit.message);
        navigation.navigate('home');
      }
    } catch (error) {
      Alert.alert('Gagal', error.toString());
    }
  };
  const handleEdit = async () => {
    try {
      const data_model = {id_pembukuan: data._id, name, notes};
      const submit = await PembukuanController.editPembukuanById(data_model);
      if (submit.code === 200) {
        Alert.alert('Sukses', submit.message);
        navigation.navigate('home');
      }
    } catch (error) {
      Alert.alert('Gagal', error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <InputComponent
        name={'Nama'}
        value={name}
        onChangeText={text => set_name(text)}
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

export default FormTambahPembukuanScreen;

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
