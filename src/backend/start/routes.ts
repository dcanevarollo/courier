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
  Route.resource('friends', 'FriendsController')
    .apiOnly()
    .only(['store', 'destroy']);
  Route.resource('messages', 'MessagesController')
    .apiOnly()
    .except(['show', 'update']);
  Route.resource('conversations', 'ConversationsController')
    .apiOnly()
    .only(['index', 'destroy']);
}).middleware(['auth']);
