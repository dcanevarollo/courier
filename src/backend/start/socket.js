/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

/** @type {import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

Ws.channel('chat', 'ChatController').middleware(['auth']);
