'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Parking = use('App/Models/Parking')

/**
 * Resourceful controller for interacting with parkings
 */
class ParkingController {
  /**
   * Show a list of all parkings.
   * GET parkings
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const parkings = await Parking.all()

    return response.json({ parkings })
  }

  /**
   * Create/save a new parking.
   * POST parkings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { carId: car_id, sectionId: section_id } = request.all()
    const parking = await Parking.create({
      car_id,
      section_id,
    })

    return response.json({ parking })
  }

  /**
   * Display a single parking.
   * GET parkings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {}

  /**
   * Update parking details.
   * PUT or PATCH parkings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a parking with id.
   * DELETE parkings/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const parking = await Parking.find(params.id)

    const success = await parking.delete()

    return response.json({ success })
  }
}

module.exports = ParkingController
