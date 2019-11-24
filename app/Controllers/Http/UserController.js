'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserController {
  /**
   * Create/save a new user.
   * POST people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const user = await User.create(request.only(['email', 'password']))

    return response.json({ user })
  }
}

module.exports = UserController
