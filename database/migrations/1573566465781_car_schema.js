"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CarSchema extends Schema {
  up() {
    this.create("cars", table => {
      table.increments();
      table.string("plate");
      table.string("description");
      table
        .integer("person_id")
        .unsigned()
        .references("id")
        .inTable("people")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("cars");
  }
}

module.exports = CarSchema;
