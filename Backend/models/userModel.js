const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  edad: { type: Number, required: true },
},{collection: 'users'});

const User = mongoose.model('User', userSchema);

module.exports = User;
