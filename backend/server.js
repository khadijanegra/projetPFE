const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/pfe', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Modèle user
const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  genre:String,
  role:String,
});

const user = mongoose.model('user', userSchema);

// Route pour créer un nouveau visiteur
app.post('/api/signup', async (req, res) => {
  const { nom, prenom, email, password, genre } = req.body;

  try {
    const newuser = new user({
      nom,
      prenom,
      email,
      password,
      genre,
    });

    await newuser.save();
    res.status(201).send('Utilisateur créé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de serveur');
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
