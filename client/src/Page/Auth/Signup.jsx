import React, { useState, useEffect } from "react";
import "../../Styles/login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    age: "",
    password: "",
    selectedGenres: [],
  });
  const [res, setres] = useState();

  const [availableGenres, setAvailableGenres] = useState([
    "Anime",
    "Sci-fi",
    "Poem",
    "Story",
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleGenreSelect = (event) => {
    const selectedGenre = event.target.value;
    if (!formData.selectedGenres.includes(selectedGenre)) {
      setFormData((prevData) => ({
        ...prevData,
        selectedGenres: [...prevData.selectedGenres, selectedGenre],
      }));
    }
    console.log(formData); // Now this is in the correct order
  };

  const handleGenreRemove = (genre) => {
    setFormData((prevData) => {
      const updatedGenres = prevData.selectedGenres.filter((g) => g !== genre);
      return {
        ...prevData,
        selectedGenres: updatedGenres,
      };
    });

    // Add the removed genre back to availableGenres
    setAvailableGenres((prevGenres) => [...prevGenres, genre].sort());
  };

  const handleSignup = async () => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setres(response.data.msg);
      console.log(response); // Assuming you want to log the response data
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  useEffect(() => {
    const updatedAvailableGenres = availableGenres.filter(
      (genre) => !formData.selectedGenres.includes(genre)
    );
    setAvailableGenres(updatedAvailableGenres);
  }, [formData.selectedGenres]);

  return (
    <div className="login-top">
      <div className="signup-inner-top">
        <div className="login-head">SIGNUP</div>
        <div className="login-input-detail">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />

          {/* Genre selection */}
          <select onChange={handleGenreSelect} value={formData.selectedGenres}>
            <option value="" selected>
              Select Genre
            </option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Display selected genres */}
          <div>
            {formData.selectedGenres.map((genre) => (
              <span
                key={genre}
                className="selected-genre"
                onClick={() => handleGenreRemove(genre)}
              >
                {genre} &times;
              </span>
            ))}
          </div>

          <button onClick={handleSignup}>Signup</button>
        </div>
        {res ? res : ""}
        <div className="login-link-signup">
          Already a User ?{" "}
          <Link to={"/login"} style={{ color: "blue" }}>
            Login
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Signup;
