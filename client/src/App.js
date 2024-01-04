import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from './Component/Navbar';
import "./App.css";
import Login from "./Page/Auth/Login";
import Signup from "./Page/Auth/Signup";
import Home from "./Page/Home/Home";
import Likes from "./Page/Likes/Likes";
import Detail from "./Page/Detail/Detail";
import Footer from "./Component/Footer";
import Profile from "./Page/Profile/Profile";
import AllCardList from "./Page/AllCardList.jsx/AllCardList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./Features/userSlice";

function App() {
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const apiUrl = `http://localhost:5000/getUser`;

      const { data } = await axios.get(apiUrl, { withCredentials: true });
      const userData = {
        name: data.name,
        email: data.username,
        age: data.age,
        genres: data.selectedGenres,
      };
      dispatch(addUser(userData));
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures that it runs only once when mounted

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
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
