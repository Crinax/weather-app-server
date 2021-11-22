import { ParamsT, ApiDictT } from './types';
import APIv1 from './v1';

export default class APIFactory {
  static apiDict: ApiDictT = {
    'v1': APIv1,
  }

  static get(version: string, params: ParamsT) {
    return new APIFactory.apiDict[version](params);
  }
}