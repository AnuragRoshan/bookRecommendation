import React, { useEffect, useState } from "react";
import "../Styles/comment.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserStatus, selectUsers } from "../Features/userSlice";

const Comment = () => {
  const user = useSelector(selectUsers);
  const userStatus = useSelector(selectUserStatus);
  const { id } = useParams();
  const [data, setData] = useState({
    comment: "",
    username: user.email,
    name: user.name,
    bookName: id,
  });

  const [comments, setComments] = useState(null); // Initialize comments state to null

  useEffect(() => {
    getComments(); // Fetch comments when the component mounts
  }, [id]);

  const postComment = async () => {
    await axios.post("http://localhost:5000/postComment", data).then((res) => {
      getComments();
    });

    setData({
      ...data,
      comment: "",
    });
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getComment/${id}`
      );
      setComments(
        response.data.comments ? response.data.comments.reverse() : []
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]); // Set comments to an empty array in case of an error
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      comment: e.target.value,
    });
    // console.log(data);
  };
  function formatTimeAgo(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);

    // Check if timestamp is a valid date
    if (isNaN(targetDate.getTime())) {
      return "Invalid date";
    }

    const timeDifference = now - targetDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 24) {
      return `${Math.floor(hours / 24)} days ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? "sec" : "secs"} ago`;
    }
  }

  return (
    <div className="comment-top">
      <div className="comment-inner-top">
        <div className="comment-head">Comments</div>
        <div className="comment-form">
          {userStatus ? (
            <>
              <div className="input-text">
                <input
                  type="text"
                  placeholder="Write Comment Here"
                  value={data.comment}
                  onChange={handleChange}
                />
                <div onClick={postComment} style={{ height: "2.7rem" }}>
                  Post
                </div>
              </div>
            </>
          ) : (
            <>Login To Comment</>
          )}
        </div>
        <div className="user-comments-list">
          {comments === null ? (
            <div>Loading...</div>
          ) : comments.length === 0 ? (
            <div>No comments available.</div>
          ) : (
            comments.map((comment) => (
              <div className="comment-detail" key={comment._id}>
                <div className="user-name">{comment.name}</div>
                <div className="user-comment">{comment.comment}</div>
                <div className="user-time">{formatTimeAgo(comment.date)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
