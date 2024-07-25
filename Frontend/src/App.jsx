import './App.css'
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import CourseList from './components/CourseList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/curso/:id" element={<CourseDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
  )
}

export default App
