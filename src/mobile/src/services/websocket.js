import Ws from '@adonisjs/websocket-client';

const websocket = Ws('ws://10.0.2.2:3333');

websocket.connect();

export default websocket;
