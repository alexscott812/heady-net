const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error('[MONGODB]', error));
db.once('open', () => console.log('[MONGODB] Connected'));

module.exports = db;