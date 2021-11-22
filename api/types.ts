import APIInterface from './v1/APIInterface';

type MethodT = 'weather';

type QueryT = {
  api_key?: string,
  latitude?: number,
  longitude?: number,
};

type ParamsT = [MethodT, QueryT];

type InterfacesT = APIInterface; 

type ApiDictT = {
  [key: string]: new (params: ParamsT) => InterfacesT;
}

export { QueryT, MethodT, ParamsT, ApiDictT }