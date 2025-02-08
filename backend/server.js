const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes');
mongoose.connect('mongodb://localhost:27017/pfe', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
  //var collection = db.collection('user');
  //collection.countDocuments().then(function(err, items) {console.info(err)})
  //    console.info(collection.find())
  //    collection.findOne({"prenom": "anis"}, function(err, item) {});
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userRoute);

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});