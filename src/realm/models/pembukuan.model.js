/* eslint-disable prettier/prettier */
import Realm from 'realm';

export class PembukuanModel {
  static generate(name, notes) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      notes: notes,
      createdAt: new Date(),
      updateAt: new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Pembukuan',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: {type : 'string', require},
      notes: {type: 'string', default: ''},
      value: {type: 'int', default: 0},
      income_value: {type: 'int', default: 0},
      outcome_value: {type: 'int', default: 0},
      createdAt: 'date',
      updateAt: 'date',
    },
  };
}

export const PembukuanRealmModel = new Realm({
  path: 'pembukuan',
  schema: [PembukuanModel.schema],
});
