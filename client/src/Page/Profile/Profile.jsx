import React from "react";
import "../../Styles/profile.css";
import {
  selectUserStatus,
  selectUsers,
  removeUser,
} from "../../Features/userSlice"; // Update the path accordingly
import { useSelector } from "react-redux";

const Profile = () => {
  const userStatus = useSelector(selectUserStatus);
  const user = useSelector(selectUsers);
  const avatar = "https://www.w3schools.com/howto/img_avatar.png";
  return (
    <div className="profile-top">
      <div className="profile-inner-top">
        <div className="profile-head">Your Profile</div>
        <div className="profile-img">
          <img src={avatar} alt="" srcset="" />
        </div>
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">Email : {user.email}</div>
        <div className="profile-email">Age : {user.age}</div>
        <div className="profile-genre">
          Selected Genre : <br />
          {user.genres ? (
            user.genres.map((genre, index) => (
              <div style={{ marginInlineStart: "0rem" }} key={index}>
                {/* Render content for each genre */}
                <ul>
                  <li>{genre}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No genres available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
