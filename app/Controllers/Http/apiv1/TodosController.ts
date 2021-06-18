import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from 'App/Models/Todo'
export default class TodosController {
  /**
   * async index
   */
  public async index({ request }) {
    // pagination
    const page = request.input('page', 1)
    const limit = request.input('per_page', 2)

    // return specific fields
    // const todos = await Todo.all()
    // return (await todos).map((todo) => todo.serialize({ fields: ['id', 'title', 'is_complete'] }))
    return Todo.query().paginate(page, limit)
  }
  public async store({ request, response }: HttpContextContract) {
    Todo.create({ title: request.input('title'), is_complete: false })
    return response.status(201).json({ created: 'task created' })
  }
  public async update({ request, response, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    todo.is_complete = request.input('is_complete')
    todo.title = request.input('title')
    todo.save()
    return response.status(200).send(todo)
  }
}
