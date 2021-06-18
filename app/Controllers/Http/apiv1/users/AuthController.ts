import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class RegistersController {
  public async register({ request, response }: HttpContextContract) {
    // validate email and password (with password confirm)
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })
    const data = await request.validate({ schema: validations })

    const user = await User.create(data)
    await Mail.send((message) => {
      message
        .from('support@todos.com')
        .to(data.email)
        .subject('Welcome to BlockParties')
        .htmlView('emails/welcome', { email: data.email })
    })
    return response.created(user)
  }

  public async login({ request, auth }: HttpContextContract) {
    const email = await request.input('email')
    const password = await request.input('password')

    const token = await auth.attempt(email, password)
    return token.toJSON()
  }
}
