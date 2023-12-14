import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Book } from './models/books.js';
import { User } from './models/user.js';

const app  = express();
app.use(bodyParser.urlencoded({extended:true})); // To supor URL-encoded bodies
app.use(bodyParser.json()); //to suport Json-encoded bodies
app.use(cors());
app.use(express.static("public"));

//Connection URL
const url = `mongodb://localhost:27017/bookmark-nestDB`;

await mongoose.connect(url);

/////////////////////////////////////////////
const port = process.env.port || 5000;
const server = app.listen(port, () => {
    console.log(`The app is up and listening on port ${port}`);
})

server.on('close', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed');
    })});

//mongoose.disconnect();

///////////////////////////////////////////////
////////SETTING UP THE ROUTES/////////////////
/////////////////////////////////////////////

//////////////////////////////////////////////
// GET ALL BOOKS INFORMATION //////////////// 
app.get("/", async (req,res)=>{
    try{
        const books = await Book.find()
        // console.log(books);
        res.send(JSON.stringify(books));
    }
    catch(err){
        console.log(`ERROR in Reading from DB ${err}`)
    }    
});

///////////////////////////////////////////////
// GET BOOK ID ///////////////////////////////
app.get("/booksinfo/:id", async (req,res)=>{
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        const book = await Book.findOne({_id})
        res.send(JSON.stringify(book));
    }
    catch(err){
        console.log(`ERROR in Reading from DB ${err}`)
    }
})

///////////////////////////////////////////////
// GET USER INFORMATION  /////////////////////
app.get("/:id", async (req,res)=>{
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        const user = await User.findOne({_id})
        res.send(JSON.stringify(user));
    }
    catch(err){
        console.log(`ERROR in Reading from DB ${err}`)
    }
})

///////////////////////////////////////////////
// GET USER INFORMATION //////////////////////
app.get("/profile/:id", async (req,res)=>{
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        const user = await User.findOne({_id})
        res.send(JSON.stringify(user));
    }
    catch(err){
        console.log(`ERROR in Reading from DB ${err}`)
    }   
})

///////////////////////////////////////////////
// GET USER BY EMAIL ///////////////////////// 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            // User found, send a success response with user ID
            res.status(200).json({ message: 'Login successful', userId: user._id });
        } else {
            // User not found, send an error response
            console.log('User not found');
            res.status(404).send('User not found');
        }

    } catch (err) {
        console.log(`ERROR in Reading from DB ${err}`);
        res.status(500).send('Internal Server Error');
    }   
});  
  
//////////////////////////////////////////////
// ADD USER /////////////////////////////////
app.post("/register", async (req,res)=>{
    const {name, email,password} = req.body;
    const newUser = new User({name, email,password})

    try{
        const saveUser = await newUser.save()
        console.log(`Save Successful: ${saveUser}`);
        res.send(JSON.stringify(saveUser));
    }
    catch(err){
        console.log(`ERROR in register the new user: ${err}`)
    }
})

////////////////////////////////////////////////
// UPDATE USER ////////////////////////////////
app.put("/settings/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        _id = new mongoose.Types.ObjectId(_id);
    
        // Process the request body
        const { name, email, password } = req.body;
        const updateData = { name, email, password };

        const updateUser = await User.findByIdAndUpdate(
            { _id },
            updateData,
            { new: true }
        );
    
        if (updateUser) {
            console.log(`Successfully Updated: ${updateUser}`);
            res.status(200).json(updateUser);
        } else {
            console.log(`No matching document could be found.`);
            res.status(404).send("No matching document could be found.");
        }
    } catch (err) {
        console.log(`ERROR in updating user: ${err}`);
        res.status(500).send("Internal Server Error");
    }
});

///////////////////////////////////////////////
// SEARCH BOOK ///////////////////////////////
app.put("/results/:keyword", async (req, res) => {
    const keyword = req.params.keyword;

    try {
        // Use a regular expression to perform a case-insensitive search
        const books = await Book.find({ title: { $regex: new RegExp(keyword, 'i') } });

        if (books.length > 0) {
            res.send(JSON.stringify(books));
        } else {
            console.log(`No matching books could be found`);
            res.status(404).send("No matching books could be found.");
        }
    } catch (err) {
        console.log(`ERROR in Searching for Books in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
  
});

//////////////////////////////////////////////
// ADD FINISHED BOOK //////////////////////// 
app.put("/updateuser/:id/addfinished", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    try {
        const book = await Book.findById(selectedBook);
        
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
        
        const bookId = book._id;

        const user = await User.findById(userId);
        
        if (user && !user.finishedBooks.includes(bookId)) {
            
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { 
                    $push: { finishedBooks: bookId },
                    $pull: { reading: bookId, 
                        toReadList: bookId }
                },
                { new: true }
            );
            
          
            res.send(JSON.stringify(updateUser));
        } else {
            console.log('Book is already in favorites.');
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

/////////////////////////////////////////////
// REMOVE FINISHED ///////////////////////// 
app.put("/updateuser/:id/removefinished", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    
    try {
        const book = await Book.findById(selectedBook);        
      
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
   
        const bookId = book._id;
        
        // Check if the bookId is already in the user's favorites
        const user = await User.findById(userId);
        
        if (user && user.finishedBooks.includes(bookId)) {            
            // If the book is not already in favorites, update the user
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { finishedBooks: bookId } },
                { new: true }
            );
            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

//////////////////////////////////////////////
// ADD TO READ BOOK /////////////////////////
app.put("/updateuser/:id/addtoread", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    try {
        const book = await Book.findById(selectedBook);
        
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
        
        const bookId = book._id;
        
        // Check if the bookId is already in the user's favorites
        const user = await User.findById(userId);
        
        if (user && !user.toReadList.includes(bookId)) {
            // If the book is not already in favorites, update the user
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { 
                    $push: { toReadList: bookId },
                    $pull: { reading: bookId, 
                             finishedBooks: bookId } 
                },
                    { new: true }
            );
        
            // Do something with the updated user if needed
            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            console.log('Book is already in favorites.');
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

///////////////////////////////////////////////
// REMOVE TO READ BOOK /////////////////////// 
app.put("/updateuser/:id/removetoread", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    
    try {
        const book = await Book.findById(selectedBook);        
      
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
   
        const bookId = book._id;
        
        // Check if the bookId is already in the user's favorites
        const user = await User.findById(userId);
        
        if (user && user.toReadList.includes(bookId)) {            
            // If the book is not already in favorites, update the user
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { toReadList: bookId } },
                { new: true }
            );

            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

//////////////////////////////////////////////
// ADD READING BOOK ///////////////////////// 
app.put("/updateuser/:id/addreading", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    try {
        const book = await Book.findById(selectedBook);
        
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
        
        const bookId = book._id;
        
        const user = await User.findById(userId);
        
        if (user && !user.reading.includes(bookId)) {
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { 
                    $push: { reading: bookId },
                    $pull: { toReadList: bookId, 
                        finishedBooks: bookId }
                },
                { new: true }
            );

            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            console.log('Book is already in favorites.');
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

///////////////////////////////////////////////
// REMOVE READING BOOK /////////////////////// 
app.put("/updateuser/:id/removereading", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    
    try {
        const book = await Book.findById(selectedBook);        
      
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
   
        const bookId = book._id;
        
        // Check if the bookId is already in the user's favorites 
        const user = await User.findById(userId);
        
        if (user && user.reading.includes(bookId)) {            
            // If the book is not already in favorites, update the user
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { reading: bookId } },
                { new: true }
            );

            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

///////////////////////////////////////////////
// ADD FAVORITE  /////////////////////////////
app.put("/updateuser/:id/addfavorite", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    try {
        const book = await Book.findById(selectedBook);
        
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
        
        const bookId = book._id;
        
        // Check if the bookId is already in the user's favorites
        const user = await User.findById(userId);
        
        if (user && !user.favorites.includes(bookId)) {
            // If the book is not already in favorites, update the user
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { $push: { favorites: bookId } },
                { new: true }
            );

            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            console.log('Book is already in favorites.');
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});

/////////////////////////////////////////////
// REMOVE FAVORITE ///////////////////////// 
app.put("/updateuser/:id/removefavorite", async (req, res) => {
    const userId = req.params.id;
    const { selectedBook } = req.body;
    
    try {
        const book = await Book.findById(selectedBook);        
      
        if (!book) {
            console.log(`No matching book could be found`);
            res.status(404).send("No matching book could be found.");
            return;
        }
   
        const bookId = book._id;
        
        // Check if the bookId is already in the user's favorites
        const user = await User.findById(userId);
        
        if (user && user.favorites.includes(bookId)) {            
            // If the book is not already in favorites, update the user
            const updateUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { favorites: bookId } },
                { new: true }
            );
            
            console.log(`Successfully Updated ${updateUser}`);
            res.send(JSON.stringify(updateUser));
        } else {
            console.log('Book is already in favorites.');
            res.send(`No matching document could be found.`);
        }
    } catch (err) {
        console.log(`ERROR in Updating User in DB ${err}`);
        res.status(500).send("Internal Server Error");
    }
    
});



