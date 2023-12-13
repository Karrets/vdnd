import { internalHttpServer } from '_/net/server';
import * as process from 'process';

function expressLog(...output: any[]) {
  console.info('[express]', output);
}

let consoleColors = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  grey: '\x1b[90m'
};

function gracefulExit(signal: NodeJS.Signals) {
  if (signal) console.log(`\nReceived signal ${signal}`);
  console.log('Gracefully closing http server');

  try {
    internalHttpServer.close(function (err) {
      if (err) {
        console.error('There was an error', err.message);
        process.exit(1);
      } else {
        console.log('http server closed successfully. Exiting!');
        process.exit(0);
      }
    });

    if (internalHttpServer.closeAllConnections) {
      setTimeout(() => process.exit(0), 5000);
      internalHttpServer.closeAllConnections();
    } else {
      setTimeout(() => process.exit(0), 5000);
    }
  } catch (err: any) {
    console.error('There was an error', err.message);
    setTimeout(() => process.exit(1), 500);
  }
}

export { expressLog, gracefulExit, consoleColors };
