import Ws from '@adonisjs/websocket-client';

const ws = Ws('ws://10.0.2.2:3333');

ws.connect();

export default ws;
