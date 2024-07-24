const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const horarioSchema = new mongoose.Schema({
  inicio: String,
  dias: String,
  horaInicio: String,
  horaFin: String,
});

const planEstudiosSchema = new mongoose.Schema({
  title: String,
  competencias: [String],
});

const courseSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  duracion: { type: Number, required: true },
  vacantes: { type: Number, required: true },
  imagen: { type: String, required: true },
  descripcion: {
    title: String,
    descripciones: [descriptionSchema],
  },
  horarios: [horarioSchema],
  modalidad: { type: String, required: true },
  planEstudios: [planEstudiosSchema],
},{collection: 'cursos'});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
