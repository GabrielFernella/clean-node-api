// Esse arquivo funciona como um mock de lib para os ambientes de teste,
// basicamente conseguimos add parametros que serão herdados direto da lib, funcionalidade do jest

module.exports = {
  isEmailValid: true,
  email: '',

  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}
