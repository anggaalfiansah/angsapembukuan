/* eslint-disable prettier/prettier */
import {PembukuanRealmModel} from '../models';
import { PembukuanDataController } from './pembukuanData.controller';

import {handleResponse} from '../../utils/helper';

export class PembukuanController {
  // get all pembukuan data
  static getAllPembukuan = async () => {
    try {
      const data = await PembukuanRealmModel.objects('Pembukuan');
      if (data) {
        return data.sorted('createdAt');
      }
    } catch (error) {
      return error;
    }
  };
  // get pembukuan by id
  static getPembukuanById = async id_pembukuan => {
    try {
      const pembukuan = await PembukuanRealmModel.objects('Pembukuan');
      if (pembukuan) {
        return pembukuan.filtered(`_id == oid(${id_pembukuan})`)[0];
      }
    } catch (error) {
      return error;
    }
  };
  // create new pembukuan
  static createNewPembukuan = async data => {
    try {
      let newPembukuan;
      await PembukuanRealmModel.write(() => {
        newPembukuan = PembukuanRealmModel.create('Pembukuan', {
          ...data,
        });
      });
      return handleResponse(200, newPembukuan, 'Pembukuan Berhasil Dibuat');
    } catch (error) {
      return handleResponse(500, error);
    }
  };
  // edit pembukuan by id
  static editPembukuanById = async data => {
    try {
      let currentPembukuan = await this.getPembukuanById(data.id_pembukuan);
      await PembukuanRealmModel.write(() => {
        currentPembukuan.name = data.name;
        currentPembukuan.notes = data.notes;
      });
      return handleResponse(200, currentPembukuan, 'Pembukuan Berhasil Diedit');
    } catch (error) {
      return handleResponse(500, error);
    }
  };
  // delete pembukuan by id
  static deletePembukuanById = async id_pembukuan => {
    try {
      const currentPembukuan = await this.getPembukuanById(id_pembukuan);
      const deleteAllPembukuanData = await PembukuanDataController.deleteAllPembukuanDataByIdPembukuan(id_pembukuan);
      if (deleteAllPembukuanData.code === 200) {
        await PembukuanRealmModel.write(() => {
          PembukuanRealmModel.delete(currentPembukuan);
        });
        return handleResponse(200, null, 'Pembukuan Berhasil Dihapus');
      }
    } catch (error) {
      return handleResponse(500, error);
    }
  };
}
