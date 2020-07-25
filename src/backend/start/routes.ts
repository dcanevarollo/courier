/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('login', 'AuthController.login');
Route.post('users', 'UsersController.store');

Route.group(() => {
  Route.delete('logout', 'AuthController.logout');

  Route.resource('users', 'UsersController').apiOnly().except(['store']);
}).middleware(['auth']);
