import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from 'App/Models/Todo'
export default class TodosController {
  /**
   * async index
   */
  public async index() {
    return Todo.all()
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
