const { default: mongoose } = require("mongoose");
const config = require("../config");

module.exports = async () => {
  try {
    const { connection } = await mongoose.connect(config.DATABASE_URL);

    return connection.db;
  } catch (error) {
    console.error(error);
  }
};
