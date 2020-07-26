/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('login', 'AuthController.login');
Route.post('users', 'UsersController.store');
Route.get('files/:id', 'FilesController.show');

Route.group(() => {
  Route.delete('logout', 'AuthController.logout');
  Route.resource('users', 'UsersController').apiOnly().except(['store']);
  Route.post('files', 'FilesController.store');
  Route.resource('messages', 'MessagesController').apiOnly().except(['update']);
}).middleware(['auth']);
