/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PembukuanController} from '../../realm/controllers';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getPembukuan();
  }, [isFocused]);

  const getPembukuan = async () => {
    const datas = await PembukuanController.getAllPembukuan();
    setData(datas);
  };

  const handleEdit = item => {
    navigation.navigate('form_tambah_pembukuan', {data: item, action: 'EDIT'});
  };

  const handleDelete = async id_pembukuan => {
    try {
      const remove = await PembukuanController.deletePembukuanById(
        id_pembukuan,
      );
      if (remove.code === 200) {
        Alert.alert('Sukses', remove.message);
        getPembukuan();
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('detail_pembukuan', {data: item})}>
      {/* judul */}
      <Text style={styles.item_title}>{item?.name.toUpperCase()}</Text>
      {/* saldo */}
      <View style={styles.item_data_container}>
        <Text style={styles.item_data_name}>Saldo</Text>
        <Text style={styles.item_data_value}>{item?.value}</Text>
      </View>
      {/* total pemasukan */}
      <View style={styles.item_data_container}>
        <Text style={styles.item_data_name}>Total Pemasukan</Text>
        <Text style={styles.item_data_value}>{item?.income_value}</Text>
      </View>
      {/* total pengeluaran */}
      <View style={styles.item_data_container}>
        <Text style={styles.item_data_name}>Total Pengeluaran</Text>
        <Text style={styles.item_data_value}>{item?.outcome_value}</Text>
      </View>
      {/* catatan */}
      <View style={styles.item_data_container_notes}>
        <Text style={styles.item_data_name}>Catatan*</Text>
        <Text style={styles.item_data_value_notes}>
          {item?.notes ? item.notes : ' - '}
        </Text>
      </View>
      {/* tombol aksi */}
      <View style={styles.item_button_container}>
        <TouchableOpacity
          style={styles.item_button}
          onPress={() => handleEdit(item)}>
          <Text style={styles.item_button_text}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item_button}
          onPress={() => handleDelete(item._id)}>
          <Text style={styles.item_button_text}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '5%',
  },
  item: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 22,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  item_title: {fontSize: 20, fontWeight: '500', marginBottom: 3},
  item_data_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  item_data_container_notes: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  item_data_value_notes: {
    fontSize: 16,
    fontWeight: '500',
  },
  item_data_name: {fontSize: 16, textAlign: 'left'},
  item_data_value: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'right',
  },
  item_button_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  item_button: {
    borderWidth: 1,
    marginVertical: 10,
    padding: '2%',
    width: '45%',
  },
  item_button_text: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
