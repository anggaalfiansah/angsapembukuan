/* eslint-disable prettier/prettier */
import Realm from 'realm';

export class PembukuanDataModel {
  static generate(id_pembukuan, date, type, value, notes) {
    return {
      _id: new Realm.BSON.ObjectId(),
      id_pembukuan,
      type,
      value,
      notes,
      date,
      createdAt: new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Pembukuan Data',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      id_pembukuan: 'string',
      type: 'string',
      value: 'int',
      notes: {type: 'string', default: ''},
      date: 'date',
      createdAt: 'date',
    },
  };
}

export const PembukuanDataRealmModel = new Realm({
  path: 'pembukuandata',
  schema: [PembukuanDataModel.schema],
});
