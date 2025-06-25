const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URI);
    console.log("mongodb connected");
  } catch (e) {
    console.log("error while  connecting to database");
  }
};
module.exports = dbConnect;
