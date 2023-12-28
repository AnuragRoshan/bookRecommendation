import React, { useState, useEffect } from "react";
import "../../Styles/login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    age: "",
    password: "",
    selectedGenres: [],
  });

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
  };

  const handleGenreRemove = (genre) => {
    const updatedGenres = formData.selectedGenres.filter((g) => g !== genre);
    setFormData((prevData) => ({
      ...prevData,
      selectedGenres: updatedGenres,
    }));

    // Add the removed genre back to availableGenres
    setAvailableGenres((prevGenres) => [...prevGenres, genre].sort());
  };

  const handleSignup = () => {
    // Implement your signup logic here
    console.log("Form Data:", formData);
    // Add further signup logic...
  };

  useEffect(() => {
    // Update available genres when selectedGenres change
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
          <select onChange={handleGenreSelect}>
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
        <div className="login-link-signup">Already a User ? Login </div>
      </div>
    </div>
  );
};

export default Signup;
