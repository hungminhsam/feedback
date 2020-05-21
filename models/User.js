const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create new Schema
// Eventhough MongoDB is Schemaless database
// Mongoose library requires us to define a Schema for our collection
// We add properties to the defined schema freely
const userSchema = new Schema({
  googleId: String,
  givenName: String,
  familyName: String,
  email: String,
  credits: { type: Number, default: 0 },
});

// Create a collection call 'users' in our MongoDB, using the provided 'userSchema'
// If the Collection NOT YET EXISTs
mongoose.model("users", userSchema);
