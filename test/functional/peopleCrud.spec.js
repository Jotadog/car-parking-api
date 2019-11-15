const { test, trait } = use('Test/Suite')('People CRUD')

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('list all people registered', async ({ client, assert }) => {
  await Factory.model('App/Models/Person').createMany(5)

  const response = await client.get('people').end()

  const { people } = response.body

  response.assertStatus(200)

  assert.exists(people)
})

test('store a new person', async ({ client, assert }) => {
  const response = await client
    .post('people')
    .send({
      name: 'Joao',
      cpf: '088.166.909-17',
      phone: '(49) 99974-3090',
    })
    .end()

  const { people } = response.body

  response.assertStatus(200)
  assert.exists(people)
})

test('show the person with provided id', async ({ client, assert }) => {
  const personData = await Factory.model('App/Models/Person').create()

  const response = await client.get(`people/${personData.id}`).end()

  const { person } = response.body

  response.assertStatus(200)
  assert.deepEqual(personData.toJSON(), person)
})

test('update the person with provided id', async ({ client, assert }) => {
  const personData = await Factory.model('App/Models/Person').create()

  const name = 'Jubiscleiton'
  const response = await client
    .put(`people/${personData.id}`)
    .send({
      name,
    })
    .end()

  response.assertStatus(200)

  const { person } = response.body

  assert.exists(person)
  assert.equal(name, person.name)
})

test('delete the person with provided id', async ({ client, assert }) => {
  const personData = await Factory.model('App/Models/Person').create()

  const response = await client.delete(`people/${personData.id}`).end()

  response.assertStatus(200)

  const { success } = response.body

  assert.exists(success)
  assert.isTrue(success)
})
