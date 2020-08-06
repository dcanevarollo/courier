/* eslint-disable no-console */
/* eslint-disable global-require */

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
*/

const { Ignitor } = require('@adonisjs/ignitor');

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .wsServer()
  .fireHttpServer()
  .catch(console.error);
