import './App.css'
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import CourseList from './components/CourseList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuccessPayment from './components/SuccessPayment';
import CancelPayment from './components/CancelPayment';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/curso/:id" element={<CourseDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<SuccessPayment />} />
      <Route path="/cancel" element={<CancelPayment />} />
    </Routes>
  </Router>
  )
}

export default App
