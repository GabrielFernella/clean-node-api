const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

module.exports = () => {
  const router = new SignUpRouter()
  router.post('/singup', new ExpressRouterAdapter().adapt(router))
}

class ExpressRouterAdapter {
  // adapter para não depender do express
  static adapt (req, res) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repetPassword } = httpRequest.body
    const user = new SignUpUseCase().signUp(email, password, repetPassword)

    return {
      statusCode: 200,
      body: user
    }
  }
}

class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = new AddAccountRepository().add(email, password)
      return user
    }
  }
}

class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
