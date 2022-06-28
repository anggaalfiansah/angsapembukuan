/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

// navigation
import {useNavigation} from '@react-navigation/native';

// icons
import Icon from 'react-native-vector-icons/AntDesign';

const DetailPembukuanHeaderComponent = props => {
  const [data, setData] = useState();

  useEffect(() => {
    if (props.children) {
      try {
        const params = JSON.parse(props.children);
        setData(params);
      } catch (error) {
        console.log(error);
      }
    }
  }, [props]);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>{data?.name}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('form_tambah_transaksi', {
            id_pembukuan: data?._id,
          })
        }>
        <Icon name="addfile" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailPembukuanHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
