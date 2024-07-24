// routes/courseRoutes.js
const express = require('express');
const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  filterCourses,
} = require('../controllers/courseController');

const router = express.Router();

router.get('/courses/filter', filterCourses);
router.get('/courses', getCourses);
router.post('/courses', createCourse);
router.get('/courses/:id', getCourseById);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;
