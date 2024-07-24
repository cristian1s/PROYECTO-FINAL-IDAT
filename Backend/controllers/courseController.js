const Course = require("../models/courseModel");

// Obtener todos los cursos
const getCourses = async (req, res) => {
    try {
      const { sortBy, order } = req.query;

      let sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy] = order === 'desc' ? -1 : 1; // Orden descendente o ascendente
      }
  
      const courses = await Course.find().sort(sortOptions);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Crear un nuevo curso
const createCourse = async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un curso por ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un curso
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un curso
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      res.json({ message: "Course deleted" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const filterCourses = async (req, res) => {
  try {
    const {
      categoria,
      nombre,
      precioMin,
      precioMax,
      vacantesMin,
      vacantesMax,
    } = req.query;

    // Construcción dinámica de filtros
    let filter = {};

    if (categoria) {
      filter.categoria = categoria;
    }

    if (nombre) {
      filter.nombre = { $regex: nombre, $options: "i" }; // Filtro case-insensitive
    }

    if (precioMin || precioMax) {
      filter.precio = {};
      if (precioMin) {
        filter.precio.$gte = parseFloat(precioMin);
      }
      if (precioMax) {
        filter.precio.$lte = parseFloat(precioMax);
      }
    }

    if (vacantesMin || vacantesMax) {
      filter.vacantes = {};
      if (vacantesMin) {
        filter.vacantes.$gte = parseInt(vacantesMin, 10);
      }
      if (vacantesMax) {
        filter.vacantes.$lte = parseInt(vacantesMax, 10);
      }
    }

    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  filterCourses,
};
