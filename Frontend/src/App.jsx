import './App.css'
import CourseDetails from './components/CourseDetails';
import CourseList from './components/CourseList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/curso/:id" element={<CourseDetails />} />
    </Routes>
  </Router>
  )
}

export default App
