export interface HttpGetClient {
  get: <T = any> (param: HttpGetClient.Params) => Promise<T>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}
