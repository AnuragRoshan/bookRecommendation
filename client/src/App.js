import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from './Component/Navbar';
import "./App.css"
import Login from "./Page/Auth/Login";
import Signup from "./Page/Auth/Signup";
import Home from "./Page/Home/Home";
import Likes from "./Page/Likes/Likes";
import Detail from "./Page/Detail/Detail"; import {
  selectUserStatus,
  selectUsers
} from "./Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Component/Footer";
import Profile from "./Page/Profile/Profile";
import AllCardList from "./Page/AllCardList/AllCardList";

function App() {

  const user = useSelector(selectUserStatus);
  console.log(user.name);
  return (
    <div className="App">
      <Router>
        <Navbar user={user} />
        <Routes>

          <Route exact path='/' element={user ? <Home /> : <Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/likes' element={<Likes />} />
          <Route exact path='/detail/:id' element={<Detail />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/allCard/:min/:max' element={<AllCardList />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
