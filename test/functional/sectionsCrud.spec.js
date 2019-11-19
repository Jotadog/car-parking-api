const { test, trait } = use('Test/Suite')('Sections CRUD')

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('list all sections registered', async ({ client, assert }) => {
  await Factory.model('App/Models/Section').createMany(5)

  const response = await client.get('sections').end()

  response.assertStatus(200)
  const { sections } = response.body

  assert.exists(sections)
  assert.isAtLeast(sections.length, 1)
})

test('store a new section', async ({ client, assert }) => {
  const sectionData = {
    name: 'Section 1',
    vacancies: 10,
  }

  const response = await client
    .post('sections')
    .send(sectionData)
    .end()

  response.assertStatus(200)

  const { section } = response.body

  assert.exists(section)
})

test('show the section with the provided id', async ({ client, assert }) => {
  const sectionData = await Factory.model('App/Models/Section').create()
  await Factory.model('App/Models/Parking').createMany(5, {
    section_id: sectionData.id,
  })

  const response = await client.get(`sections/${sectionData.id}`).end()

  response.assertStatus(200)

  const { section } = response.body

  assert.exists(section)
  assert.exists(section.parkings)
  assert.isAtLeast(section.parkings.length, 5)
}).timeout(0)

test('update the section with the provided id', async ({ client, assert }) => {
  const sectionData = await Factory.model('App/Models/Section').create()

  const name = 'A47'
  const response = await client
    .put(`sections/${sectionData.id}`)
    .send({
      name,
    })
    .end()

  response.assertStatus(200)

  const { section } = response.body

  assert.exists(section)
  assert.strictEqual(name, section.name)
})

test('delete the section with provided id', async ({ client, assert }) => {
  const sectionData = await Factory.model('App/Models/Section').create()

  const response = await client.delete(`sections/${sectionData.id}`).end()

  const { success } = response.body

  assert.exists(success)
  assert.isTrue(success)
})
