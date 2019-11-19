const { test, trait } = use('Test/Suite')('Parkings CRUD')

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('list all parkings registered', async ({ client, assert }) => {
  await Factory.model('App/Models/Parking').createMany(5)

  const response = await client.get('parkings').end()

  response.assertStatus(200)

  const { parkings } = response.body

  assert.exists(parkings)
}).timeout(0)

test('store a new parking', async ({ client, assert }) => {
  const car = await Factory.model('App/Models/Car').create()
  const section = await Factory.model('App/Models/Section').create()

  const response = await client
    .post('parkings')
    .send({
      carId: car.id,
      sectionId: section.id,
    })
    .end()

  response.assertStatus(200)

  const { parking } = response.body

  assert.exists(parking)
})

test('delete the parking with provided id', async ({ client, assert }) => {
  const parking = await Factory.model('App/Models/Parking').create()

  const response = await client.delete(`parkings/${parking.id}`).end()

  response.assertStatus(200)

  const { success } = response.body

  assert.exists(success)
  assert.isTrue(success)
})
