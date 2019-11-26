'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Car = use('App/Models/Car')

/**
 * Resourceful controller for interacting with cars
 */
class CarController {
  /**
   * Show a list of all cars.
   * GET cars
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const cars = await Car.query()
      .with('person')
      .fetch()

    return response.json({ cars })
  }

  /**
   * Create/save a new car.
   * POST cars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { plate, description, personId: person_id } = request.all()
    const car = await Car.create({
      plate,
      description,
      person_id,
    })

    return response.json({ car })
  }

  /**
   * Display a single car.
   * GET cars/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const car = await Car.find(params.id)
    await car.load('person')
    return response.json({ car })
  }

  /**
   * Update car details.
   * PUT or PATCH cars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const car = await Car.find(params.id)
    car.merge(request.all())
    await car.save()

    return response.json({ car })
  }

  /**
   * Delete a car with id.
   * DELETE cars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const car = await Car.find(params.id)

    const success = await car.delete()

    return response.json({ success })
  }
}

module.exports = CarController
