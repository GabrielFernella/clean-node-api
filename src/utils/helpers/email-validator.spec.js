const EmailValidator = require('./email-validator')
const MissingParamError = require('../errors/missing-param-error')
const validator = require('validator')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@email.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns true', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email')

    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('valid_email@gmail.com')

    expect(validator.email).toBe('valid_email@gmail.com')
  })

  test('Should throw if no email is proveided', async () => {
    const sut = makeSut()
    // quando estiver testando uma função não asyncrona, vc deve direcionar o ponteiro, ao invés de sut.isValid(), seria sut.isValid
    expect(() => sut.isValid()).toThrow(new MissingParamError('email'))
  })
})
