const { test, trait } = use('Test/Suite')('Cars CRUD')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('list all cars registered', async ({ client, assert }) => {
  const response = await client.get('cars').end()

  response.assertStatus(200)

  assert.exists(response.body.cars)
})

test('store a new car', async ({ client, assert }) => {
  const person = await Factory.model('App/Models/Person').create()

  const response = await client
    .post('cars')
    .send({
      plate: '12345',
      description: 'corsinha amarelo',
      personId: person.id,
    })
    .end()

  response.assertStatus(200)

  const { car } = response.body

  assert.exists(car)
})

test('show the car with provided id', async ({ client, assert }) => {
  const carData = await Factory.model('App/Models/Car').create()

  const response = await client.get(`cars/${carData.id}`).end()

  response.assertStatus(200)

  const { car } = response.body

  assert.exists(car)
  assert.deepEqual(carData.toJSON(), car)
})

test('update the car with provided id', async ({ client, assert }) => {
  const carData = await Factory.model('App/Models/Car').create()

  const description = 'fusca azul'

  const response = await client
    .put(`cars/${carData.id}`)
    .send({ description })
    .end()

  response.assertStatus(200)

  const { car } = response.body

  assert.exists(car)
  assert.strictEqual(car.description, description)
})

test('delete the car with provided id', async ({ client, assert }) => {
  const carData = await Factory.model('App/Models/Car').create()

  const response = await client.delete(`cars/${carData.id}`).end()

  response.assertStatus(200)

  const { success } = response.body

  assert.exists(success)
  assert.isTrue(success)
})
