import Homepage from "./Pages/Homepage"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterNow from "./Pages/Register";
import ChromiumTreatment from "./Pages/Process";
import Profile from "./Pages/Profile";
import ChromiumTicket from "./Pages/ChromiumTicket";
function App() {


  return (
    <Router>
      
    <div>
    <Routes>
          <Route path="/" element={<Homepage />} />      {/* Homepage route */}
          <Route path="/register" element={<RegisterNow/>} />
          <Route path="/process" element={<ChromiumTreatment/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/ticket" element={<ChromiumTicket/>}/>
          
           {/* Contact page route */}
        </Routes>
    </div>
    </Router>
  )
}

export default App
