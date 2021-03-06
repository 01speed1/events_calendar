require("dotenv").config();
const mongoose = require("mongoose");

const dabaseUrl = `${process.env.NODE_DATABASE_URL}/events_${process.env.NODE_ENV}DB`

beforeEach(function (done) {
  function clearDB() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].deleteOne(() => {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      dabaseUrl,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

afterAll(function (done) {
  mongoose.disconnect();
  return done();
});
