/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'AuthController.login');

Route.group(() => {
  Route.delete('/logout', 'AuthController.logout');
}).middleware(['auth']);
