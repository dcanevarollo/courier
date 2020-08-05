/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('login', 'AuthController.login');
Route.post('users', 'UserController.store').validator('StoreUser');
Route.post('files', 'FileController.store').validator('UploadFile');

Route.group(() => {
  Route.get('files/:id', 'FileController.show');
  Route.resource('friends', 'FriendController').only(['store', 'destroy']);
  Route.resource('messages', 'MessageController')
    .apiOnly()
    .except(['show', 'update'])
    .validator(new Map([[['messages.store'], ['StoreMessage']]]));
  Route.resource('conversations', 'ConversationController').only([
    'index',
    'destroy',
  ]);
}).middleware(['auth']);
