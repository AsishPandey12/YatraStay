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
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6842e84fcb2183a437bd17cc",
  }));
  await Listing.insertMany(initData.data);

  console.log("Data Was initialized");
};

initDB();
