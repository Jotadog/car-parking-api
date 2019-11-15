'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Person extends Model {
  cars() {
    return this.belongsToMany('App/Models/Car')
  }
}

module.exports = Person
