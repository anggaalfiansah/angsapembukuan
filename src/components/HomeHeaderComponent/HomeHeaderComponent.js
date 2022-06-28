/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';

// navigation
import {useNavigation} from '@react-navigation/native';

// icons
import Icon from 'react-native-vector-icons/AntDesign';

const ScreenWidth = Dimensions.get('window').width;

const DetailPembukuanHeaderComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('form_tambah_pembukuan', {action: 'NEW'})
        }>
        <Icon name="addfolder" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailPembukuanHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: ScreenWidth - 33,
  },
});
