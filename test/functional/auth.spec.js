'use strict'

const { test, trait } = use('Test/Suite')('Login')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('successful login try returning a jwt token', async ({
  client,
  assert,
}) => {
  const userData = {
    password: '123456',
  }

  const user = await Factory.model('App/Models/User').create(userData)

  const response = await client
    .post('login')
    .send({
      email: user.email,
      password: userData.password,
    })
    .end()

  response.assertStatus(200)

  assert.exists(response.body.token)
})

test('unsuccessful login try with wrong password', async ({ client }) => {
  const userData = {
    password: '123456',
  }

  const user = await Factory.model('App/Models/User').create(userData)

  const response = await client
    .post('login')
    .send({
      email: user.email,
      password: '123',
    })
    .end()

  response.assertStatus(401)
})
