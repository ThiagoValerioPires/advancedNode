export interface HttpGetClient {
  get: (param: HttpGetClient.Params) => Promise<void>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}
