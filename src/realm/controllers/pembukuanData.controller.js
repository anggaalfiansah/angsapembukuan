/* eslint-disable prettier/prettier */
import {handleResponse} from '../../utils/helper';
import {PembukuanDataRealmModel, PembukuanRealmModel} from '../models';
import {PembukuanController} from './pembukuan.controller';

export class PembukuanDataController {
  static getAllPembukuanDataByIdPembukuan = async id_pembukuan => {
    try {
      const data = await PembukuanDataRealmModel.objects('Pembukuan Data');
      if (data) {
        let saldo = 0;
        const result = [];
        data.filtered(`id_pembukuan == '${id_pembukuan}'`).sorted('date').map(item => {
          saldo = item.type === 'income' ? saldo + item.value : saldo - item.value;
          item.saldo = saldo;
          result.push(item);
        });
        return result.reverse();
      }
    } catch (error) {
      return error;
    }
  };
  static getPembukuanDataById = async id_pembukuan_data => {
    try {
      const data = await PembukuanDataRealmModel.objects('Pembukuan Data');
      if (data) {
        return data.filtered(`_id == oid(${id_pembukuan_data})`)[0];
      }
    } catch (error) {
      return error;
    }
  };
  static createNewPembukuanData = async data => {
    try {
      const currentPembukuan = await PembukuanController.getPembukuanById(
        data.id_pembukuan,
      );
      await PembukuanRealmModel.write(() => {
        currentPembukuan.value =
          data.type === 'income'
            ? currentPembukuan.value + data.value
            : currentPembukuan.value - data.value;
        if (data.type === 'income') {
          currentPembukuan.income_value =
            currentPembukuan.income_value + data.value;
        }
        if (data.type === 'outcome') {
          currentPembukuan.outcome_value =
            currentPembukuan.outcome_value + data.value;
        }
      });
      let newPembukuanData;
      await PembukuanDataRealmModel.write(() => {
        newPembukuanData = PembukuanDataRealmModel.create(
          'Pembukuan Data',
          data,
        );
      });
      return handleResponse(200, newPembukuanData, 'Transaksi Berhasil Dibuat');
    } catch (error) {
      return handleResponse(500, error);
    }
  };
  static deleteAllPembukuanDataByIdPembukuan = async id_pembukuan => {
    try {
      const currentPembukuanData = await this.getAllPembukuanDataByIdPembukuan(
        id_pembukuan,
      );
      // remove pembukuan
      await PembukuanDataRealmModel.write(() => {
        PembukuanDataRealmModel.delete(currentPembukuanData);
      });
      return handleResponse(200, null, 'Semua Transaksi Berhasil Dihapus');
    } catch (error) {
      return handleResponse(500, error);
    }
  };
  static deletePembukuanDataById = async (id_pembukuan, id_pembukuan_data) => {
    try {
      const currentPembukuan = await PembukuanController.getPembukuanById(
        id_pembukuan,
      );
      const currentPembukuanData = await this.getPembukuanDataById(
        id_pembukuan_data,
      );
      // update pembukuan
      await PembukuanRealmModel.write(() => {
        currentPembukuan.value =
          currentPembukuanData.type === 'income'
            ? currentPembukuan.value - currentPembukuanData.value
            : currentPembukuan.value + currentPembukuanData.value;
        if (currentPembukuanData.type === 'income') {
          currentPembukuan.income_value =
            currentPembukuan.income_value - currentPembukuanData.value;
        }
        if (currentPembukuanData.type === 'outcome') {
          currentPembukuan.outcome_value =
            currentPembukuan.outcome_value - currentPembukuanData.value;
        }
      });
      // remove pembukuan
      await PembukuanDataRealmModel.write(() => {
        PembukuanDataRealmModel.delete(currentPembukuanData);
      });
      return handleResponse(200, null, 'Transaksi Berhasil Dihapus');
    } catch (error) {
      return handleResponse(500, error);
    }
  };
}
