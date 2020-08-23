const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  useFindAndModify: false,
  useUnifiedTopology: true
};


// you can run docker to start a mongo db instance "sudo docker-compose up"
const dabaseUrl = `${process.env.NODE_DATABASE_URL}/events_${process.env.NODE_ENV}DB`

module.dabaseUrl = dabaseUrl

console.log('dabaseUrl', dabaseUrl)

module.exports = mongoose.connect(
  dabaseUrl,
  options
);