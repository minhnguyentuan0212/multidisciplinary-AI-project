const mongoose = require('mongoose');
const connection_string = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(connection_string.concat('smart-home?retryWrites=true&w=majority'));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;