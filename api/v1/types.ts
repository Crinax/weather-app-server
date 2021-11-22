import { MethodT } from '../types';

type MethodDictT = {
  [key in MethodT]: Function
};

type ResponseMapquestInfoCopyrightT = {
  text: string,
  imageUrl: string,
  imageAllText: string,
}

type ResponseMapquestInfoT = {
  statuscode: number,
  copyright: ResponseMapquestInfoCopyrightT,
  messages: any[]
}

type ResponseMapquestOptionsT = {
  maxResult: number,
  thumbMaps: boolean,
  ignoreLatLangInput: boolean,
}

type GPSPositionT = {
  lat: number,
  lng: number
}

type ResponseMapquestResultLocationsT = {
  street: string,
  adminArea6: string,
  adminArea6Type: string,
  adminArea5: string,
  adminArea5Type: string,
  adminArea4: string,
  adminArea4Type: string,
  adminArea3: string,
  adminArea3Type: string,
  adminArea1: string,
  adminArea1Type: string,
  postalCode: string,
  geocodeQualityCode: string,
  geocodeQuality: string,
  dragPoint: boolean,
  sideOfStreat: string,
  linkId: string,
  unknownInput: string,
  type: string,
  latLng: GPSPositionT,
  displayLatLng: GPSPositionT,
}

type ResponseMapquestResultT = {
  providedLocation: { latLng: GPSPositionT },
  locations: ResponseMapquestResultLocationsT[],
}

type ResponseMapquestT = {
  info: ResponseMapquestInfoT,
  options: ResponseMapquestOptionsT,
  results: ResponseMapquestResultT[],
}

type WeatherT = {
  id: number,
  main: string,
  description: string,
  icon: string
}

type WeatherResponseMainT = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number,
  sea_level: number,
  grnd_level: number,
}

type WeatherResponseWindT = {
  speed: number,
  deg: number,
  gust: number,
}

type WeatherResponseRainfallT = {
  '1h': number,
  '3h': number,
}

type WeatherResposeSysT = {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number,
}

type WeatherResponseT = {
  coord: { lat: string, lon: string },
  weather: WeatherT[],
  base: string,
  main: WeatherResponseMainT,
  visibility: number,
  wind: WeatherResponseWindT,
  clouds: { all: number },
  rain?: WeatherResponseRainfallT,
  snow?: WeatherResponseRainfallT,
  dt: number,
  sys: WeatherResposeSysT,
  timezone: number,
  id: number,
  name: string,
  cod: number,
}

export { MethodDictT, ResponseMapquestT, WeatherResponseT }