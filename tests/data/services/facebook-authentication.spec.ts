import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi
  ) { }

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params)
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookApi.Params) => Promise<void>
}

namespace LoadFacebookApi {
  export type Params = {
    token: string
  }
}

class LoadFacebookApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser (params: LoadFacebookApi.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookApi = new LoadFacebookApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookApi.token).toBe('any_token')
  })
})
