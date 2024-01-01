import React from "react";
import "../../Styles/profile.css";
// import avatar from "../../assets/avatar.jpg"; // Import your avatar image

const user = {
  name: "John Doe",
  email: "john@example.com",
  age: 25,
  shortBio: "Passionate reader and technology enthusiast.",
  books: ["Book 1", "Book 2", "Book 3"],
};

const Profile = () => {
  const avatar = "https://www.w3schools.com/howto/img_avatar.png";
  return (
    <div className="container">
      <div className="background-pattern"></div>
      <div className="profile-header">
        <img src={avatar} alt="User Avatar" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>

      <div className="profile-info">
        <p>Age: {user.age}</p>
      </div>

      <div className="short-bio">
        <p>{user.shortBio}</p>
      </div>
    </div>
  );
};

export default Profile;
