import * as process from 'process';

import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'vdungeons';

function initDatabase() {
  mongoose
    .connect(`${connectionString}/${dbName}`)
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection error');
      console.error(err);
      process.exit(1);
    });
}

export default initDatabase;
