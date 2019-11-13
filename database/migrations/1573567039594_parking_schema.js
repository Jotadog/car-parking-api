"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParkingSchema extends Schema {
  up() {
    this.create("parkings", table => {
      table.increments();
      table
        .integer("car_id")
        .unsigned()
        .references("id")
        .inTable("cars");
      table
        .integer("section_id")
        .unsigned()
        .references("id")
        .inTable("sections");
      table.timestamps();
    });
  }

  down() {
    this.drop("parkings");
  }
}

module.exports = ParkingSchema;
