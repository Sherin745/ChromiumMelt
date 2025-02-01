import Homepage from "./Pages/Homepage"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterNow from "./Pages/Register";
function App() {


  return (
    <Router>
      
    <div>
    <Routes>
          <Route path="/" element={<Homepage />} />      {/* Homepage route */}
          <Route path="/register" element={<RegisterNow/>} />
          
           {/* Contact page route */}
        </Routes>
    </div>
    </Router>
  )
}

export default App
