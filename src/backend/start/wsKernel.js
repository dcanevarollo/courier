/** @type {import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each Websocket channel subscription.
|
*/
const globalMiddleware = [];

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key/value pairs. Later you can use the
| keys to run selected middleware on a given channel.
*/
const namedMiddleware = {};

Ws.registerGlobal(globalMiddleware).registerNamed(namedMiddleware);
