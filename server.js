const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB successfully!');
});

// Define routes

// Home route
app.get('/', (req, res) => {
    res.send('Database Connection Status: ' + db.readyState? "connected":"disconnected");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const app = express();

const port =3000;

// define the ping route with the response in JSON

app.get('/ping',( req, res) => {

  res.json({message:'pong'});
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
     

