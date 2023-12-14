import mongoose from "mongoose";

// Defining the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book' // Reference to the Book model
  }],
  toReadList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book' // Reference to the Book model
  }],
  reading: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book' // Reference to the Book model
  }],
  finishedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book' // Reference to the Book model
  }]
});

// Compiling the schema into model
export const User = mongoose.model("User", userSchema);