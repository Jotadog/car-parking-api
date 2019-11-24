'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parking extends Model {
  car() {
    return this.belongsTo('App/Models/Car')
  }

  section() {
    return this.belongsTo('App/Models/Section')
  }
}

module.exports = Parking
