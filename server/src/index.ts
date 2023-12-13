import { server } from '_/net/server.js';
import { gracefulExit } from '_/util';
import initDatabase from '_/db/database';

initDatabase();
server();

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
