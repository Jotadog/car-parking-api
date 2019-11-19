'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
  parkings() {
    return this.hasMany('App/Models/Parking')
  }
}

module.exports = Section
