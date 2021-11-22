import APIResponse from './APIResponse';

export default interface APIInterface {
  response: APIResponse;

  init(): Promise<Promise<Function>>;
  getWeather(): Promise<APIResponse>;
}