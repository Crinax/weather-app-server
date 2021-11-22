import crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';

import APIResponse from './APIResponse';
import APIInterface from './APIInterface';
import { ParamsT, QueryT } from '../types';
import { MethodDictT, ResponseMapquestT, WeatherResponseT } from  './types';

export default class API implements APIInterface {
  constructor(params: ParamsT) {
    this.method = this.methodDict[params[0]];
    this.query = params[1];

    if (this.query.latitude === undefined || this.query.longitude === undefined) {
      this.response = new APIResponse(400, `Bad request: latitude and longitude are required parameters`);
    }
  }

  public response: APIResponse = new APIResponse(200, 'ok');

  protected method: Function;
  protected query: QueryT;

  private methodDict: MethodDictT = {
    weather: this.getWeather,
  }

  async init() {
    return await this.method();
  }

  async getWeather() {
    const { latitude, longitude } = this.query;
    const urlMapquest = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_KEY}&location=${latitude}%2C${longitude}&outFormat=json&thumbMaps=false`
    const urlWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_KEY}`;

    let $geo: AxiosResponse = { status: 0, statusText: 'ok', headers: {}, config: {}, data: {} };
    let $weather: AxiosResponse = { status: 0, statusText: 'ok', headers: {}, config: {}, data: {} };

    await (async () => {
      try {
        $geo = await axios.get(urlMapquest);
        $weather = await axios.get(urlWeather);
      } catch(err) {
        this.response = new APIResponse(502, 'Connection error. Try to reload page.');
      }
    })();

    if (this.response.code !== 200) return this.response;

    const geoData: ResponseMapquestT = await $geo?.data;
    const weatherData: WeatherResponseT = await $weather?.data;

    const response = {
      city: {
        country: geoData.results[0].locations[0].adminArea1,
        state: geoData.results[0].locations[0].adminArea3,
        stateCountry: geoData.results[0].locations[0].adminArea4,
        city: geoData.results[0].locations[0].adminArea5,
        neighborhood: geoData.results[0].locations[0].adminArea6,
        street: geoData.results[0].locations[0].street,
      },
      weather: {
        id: weatherData.weather[0].id,
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        temperature: {
          data: {
            kelvin: weatherData.main.temp,
            celsius: weatherData.main.temp - 273.15,
            farenheit: (weatherData.main.temp - 273.15) * 9/5 + 32,
          },
          feels: {
            kelvin: weatherData.main.feels_like,
            celsius: weatherData.main.feels_like - 273.15,
            farenheit: (weatherData.main.feels_like - 273.15) * 9/5 + 32,
          }
        },
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        wind: {
          speed: weatherData.wind.speed,
          deg: weatherData.wind.deg,
          gust: weatherData.wind.gust,
        },
        clouds: weatherData.clouds.all,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
      }
    }
    
    this.response = new APIResponse(200, 'ok', response);
    return this.response;
  }

  private throwErr(err: any) {
    console.log(err);
    this.response = new APIResponse(500, 'Internal server error: something went wrong. Contact the administrator');
  }
}