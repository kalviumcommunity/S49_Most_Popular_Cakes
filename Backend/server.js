const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes'); // Import your routes file
const cors = require('cors');
require('dotenv').config();

// Use cors middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const cakesmodel = require('./models/cakes');
const CakeModel = require('./models/cakemodel');
// Use the routes
app.use('/', routes);

const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
  } catch (err) {
    console.error(err);
  }
};

const stopDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("disconnected");
  } catch (err) {
    console.error(err);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

app.get('/cakemodels', async (req, res) => {
  try {
    let x = await cakesmodel.find();
    console.log(x)
    res.json(x);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/cakes', async (req, res) => {
  try {
    // Extract cake data from request body
    const { cakeName, rating } = req.body;

    // Create a new CakeModel instance
    const newCake = new CakeModel({
      cakeName,
      rating
    });

    // Save the new cake to the database
    const savedCake = await newCake.save();

    // Respond with the saved cake
    res.status(201).json(savedCake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
  }
});

// Middleware to handle undefined routes
// app.use((req, res) => res.status(404).send('Not found'));

// app.listen(3000, () => {
//   startDatabase();
//   console.log(`🚀Server is running on port ${3000}`);
// });

app.listen(3000, async () => {
  await startDatabase();
  console.log('🚀 Server running on PORT: 3000');
})