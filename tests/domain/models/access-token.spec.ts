import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
  it('should creat with a value', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })
})
