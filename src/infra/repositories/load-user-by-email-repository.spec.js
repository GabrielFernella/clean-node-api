const { MongoClient } = require('mongodb')

class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      return null
    }
    this.email = email
    return email
  }
}

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('Token Generator', () => {
  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    // sut.findByEmail = null
    const user = await sut.load('invalid_email@gmail.com')
    expect(user).toBeNull()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    // sut.findByEmail = null
    const user = await sut.load('valid_email@gmail.com')
    expect(user.email).toBe('valid_email@gmail.com')
  })
})
