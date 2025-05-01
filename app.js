const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodoverride = require("method-override");

const Mongo_URL = "mongodb://127.0.0.1:27017/YatraStay";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.get("/", (req, res) => {
  res.send("Root is working");
});

// Index Route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(listing);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Beachfront Villa in Goa",
//     description:
//       "Enjoy a peaceful stay in this sea-facing villa with private garden and hammock.",
//     price: 4500,
//     location: "Anjuna Beach, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("Succesfull testing");
// });

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
