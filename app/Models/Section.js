'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
  parking() {
    return this.belongsTo('App/Models/Parking')
  }
}

module.exports = Section
