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

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    email: faker.email({ domain: 'gmail.com' }),
    password: await Hash.make(faker.word()),
    ...data,
  }
})

Factory.blueprint('App/Models/Person', async (faker, i, data) => {
  return {
    name: faker.name(),
    cpf: faker.cpf(),
    phone: faker.phone(),
    ...data,
  }
})
