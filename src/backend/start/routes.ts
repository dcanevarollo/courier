/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('login', 'AuthController.login');
Route.post('users', 'UsersController.store');
Route.resource('files', 'FilesController').apiOnly().only(['store', 'show']);

Route.group(() => {
  Route.delete('logout', 'AuthController.logout');
  Route.resource('users', 'UsersController').apiOnly().except(['store']);
  Route.resource('messages', 'MessagesController').apiOnly().except(['update']);
}).middleware(['auth']);
