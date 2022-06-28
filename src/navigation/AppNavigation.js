/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  FormTambahPembukuanScreen,
  FormTambahPembukuanItemScreen,
} from '../screens';
import {
  DetailPembukuanHeaderComponent,
  HomeHeaderComponent,
} from '../components';
import DetailPembukuanScreen from '../screens/DetailPembukuanScreen/DetailPembukuanScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerTitle: props => <HomeHeaderComponent {...props} />,
          }}
        />
        <Stack.Screen
          name="detail_pembukuan"
          component={DetailPembukuanScreen}
          options={{
            headerTitle: props => <DetailPembukuanHeaderComponent {...props} />,
          }}
        />
        <Stack.Screen
          name="form_tambah_pembukuan"
          component={FormTambahPembukuanScreen}
          options={{title: 'Tambah Pembukuan'}}
        />
        <Stack.Screen
          name="form_tambah_transaksi"
          component={FormTambahPembukuanItemScreen}
          options={{title: 'Tambah Transaksi'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
