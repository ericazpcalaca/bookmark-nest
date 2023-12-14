import mongoose from "mongoose";

// Defining the schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher:{
        type: String
    },
    description: {
        type: String
    },
    imageLinks: {
        smallThumbnail: String,
        thumbnail: String
    },
    pageCount: {
        type: Number 
    }
});

// Compiling the schema into model
export const Book = mongoose.model("Book", bookSchema);