import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookApi = new LoadFacebookApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookApi.token).toBe('any_token')
  })

  it('should return authentication error when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookApi = new LoadFacebookApiSpy()
    loadFacebookApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
