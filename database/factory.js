'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker, _i, data) => {
  return {
    email: faker.email({ domain: 'gmail.com' }),
    password: await Hash.make(faker.word()),
    ...data,
  }
})

Factory.blueprint('App/Models/Person', async (faker, _i, data) => {
  return {
    name: faker.name(),
    cpf: faker.cpf(),
    phone: faker.phone(),
    ...data,
  }
})

Factory.blueprint('App/Models/Section', async (faker, _i, data) => {
  return {
    name: faker.word(),
    vacancies: 15,
    ...data,
  }
})

Factory.blueprint('App/Models/Car', async (faker, _i, data) => {
  const person = await Factory.model('App/Models/User').create()

  return {
    plate: faker.string({ length: 7 }),
    description: faker.sentence({ words: 10 }),
    person_id: person.id,
    ...data,
  }
})

Factory.blueprint('App/Models/Parking', async (_faker, _i, data) => {
  const car = await Factory.model('App/Models/Car').create()
  const section = await Factory.model('App/Models/Section').create()

  return {
    car_id: car.id,
    section_id: section.id,
    ...data,
  }
})
