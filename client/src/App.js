import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from './Component/Navbar';
import "./App.css"
import Login from "./Page/Auth/Login";
import Signup from "./Page/Auth/Signup";
import Home from "./Page/Home/Home";


function App() {
  let user = true;
  return (
    <div className="App">
      <Router>
        <Navbar user={user} />
        <Routes>

          <Route exact path='/' element={user ? <Home /> : <Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
