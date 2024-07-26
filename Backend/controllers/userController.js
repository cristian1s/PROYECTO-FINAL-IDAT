const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  const { nombre, apellidos, correo, contraseña, edad } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newUser = new User({
      nombre,
      apellidos,
      correo,
      contraseña: hashedPassword,
      edad,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const user = await User.findOne({ correo });
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

module.exports = { registerUser, loginUser };