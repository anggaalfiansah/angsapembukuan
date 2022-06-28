/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PembukuanDataController} from '../../realm/controllers';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const DetailPembukuanScreen = ({navigation, route}) => {
  const {data} = route.params;
  const [ListTransaksi, setListTransaksi] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getListPembukuanData();
    navigation.setOptions({title: JSON.stringify(data)});
  }, [isFocused]);

  // get list transaksi
  const getListPembukuanData = async () => {
    const listPembukuanData =
      await PembukuanDataController.getAllPembukuanDataByIdPembukuan(data._id);
    setListTransaksi(listPembukuanData);
  };

  const handleDelete = async id_pembukuan_data => {
    try {
      const remove = await PembukuanDataController.deletePembukuanDataById(
        data._id,
        id_pembukuan_data,
      );
      if (remove.code === 200) {
        Alert.alert('Sukses', remove.message);
        getListPembukuanData();
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      // onPress={() => navigation.navigate('detail_pembukuan', {data: item})}
    >
      {/* type */}
      <View style={styles.item_data_container}>
        <Text style={styles.item_data_value}>
        {moment(item.date).format('DD/MM/YYYY')}</Text>
        <Text style={styles.item_data_value}>
          {item?.type.toUpperCase()}
        </Text>
      </View>
      {/* nominal */}
      <View style={styles.item_data_container}>
        <Text style={styles.item_data_name}>Nominal</Text>
        <Text style={styles.item_data_value}>{item?.value}</Text>
      </View>
      <View style={styles.item_data_container}>
        <Text style={styles.item_data_name}>Saldo</Text>
        <Text style={styles.item_data_value}>{item?.saldo}</Text>
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
        {/* <TouchableOpacity
          style={styles.item_button}
          // onPress={() => handleEdit(item)}
        >
          <Text style={styles.item_button_text}>EDIT</Text>
        </TouchableOpacity> */}
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
        data={ListTransaksi}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DetailPembukuanScreen;

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
  item_title: {fontSize: 15, fontWeight: '500', marginBottom: 3},
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
    flexDirection: 'row-reverse',
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
