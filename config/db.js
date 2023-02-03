const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      db,
      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    );
    console.log("mongodb connected ...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnection;
