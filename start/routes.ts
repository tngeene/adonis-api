/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  // route group with auth middleware
  Route.group(() => {
    Route.get('todo', 'apiv1/TodosController.index')
    Route.post('todo', 'apiv1/TodosController.store')
    Route.patch('todo/:id', 'apiv1/TodosController.update')
  }).middleware('auth')

  Route.post('register', 'apiv1/users/AuthController.register')
  Route.post('login', 'apiv1/users/AuthController.login')
}).prefix('api/v1/')
