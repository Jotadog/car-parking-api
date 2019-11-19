'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Section = use('App/Models/Section')

/**
 * Resourceful controller for interacting with sections
 */
class SectionController {
  /**
   * Show a list of all sections.
   * GET sections
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const sections = await Section.all()

    return response.json({ sections })
  }

  /**
   * Create/save a new section.
   * POST sections
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const section = await Section.create(request.only(['name', 'vacancies']))
    return response.json({ section })
  }

  /**
   * Display a single section.
   * GET sections/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const section = await Section.find(params.id)
    await section.load('parkings')
    return response.json({ section })
  }

  /**
   * Update section details.
   * PUT or PATCH sections/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const section = await Section.find(params.id)
    section.merge(request.all())
    await section.save()

    return response.json({ section })
  }

  /**
   * Delete a section with id.
   * DELETE sections/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const section = await Section.find(params.id)

    const success = await section.delete()

    return response.json({ success })
  }
}

module.exports = SectionController
