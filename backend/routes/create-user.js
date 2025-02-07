const express = require('express');
const app = express();
const User = require('../models/user');


app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.listen(3001, function () {
  console.log('Server listening on port 3001');
});