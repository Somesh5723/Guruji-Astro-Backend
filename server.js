const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Import the required modules
const User = require('./models/user');

// User registration
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});
