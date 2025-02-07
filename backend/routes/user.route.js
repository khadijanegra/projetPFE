const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assure-toi que tu as un modèle User
const mongoose = require("mongoose");


router.get('/users', async (req, res) => {
  const users = await User.find();
  console.info(mongoose.models)
  res.json(users);
});

// Route pour récupérer un utilisateur par son ID
router.get('/users/:id', async (req, res) => {
  let userId = req.params.id;
  console.log('ID de la requête:', userId);

  // Nettoie l'ID pour enlever les espaces et les caractères invisibles comme \n
  //userId = userId.trim();

  // Vérifie si l'ID est valide
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: 'ID invalide' });
  }

  try {
    // Recherche l'utilisateur par son ID passé dans l'URL
    const user = await User.findById(userId)
    console.info('Utilisateur trouvé:', user);

    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }

    res.json(user); // Retourne l'utilisateur trouvé en format JSON
  } catch (err) {
    console.error('Erreur lors de la récupération:', err);
    res.status(500).send({
      message: 'Erreur lors de la récupération de l’utilisateur',
      error: err.message || err
    });
  }
});

module.exports = router;
