const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/YatraStay";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);

  console.log("Data Was initialized");
};

initDB();
