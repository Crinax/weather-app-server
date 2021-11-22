export default class APIResponse {
  constructor(
    public code: number,
    public message: string,
    public data?: object,
  ) {}
}