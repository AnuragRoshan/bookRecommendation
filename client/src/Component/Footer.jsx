import React from "react";
import "../Styles/navbar.css";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#2d2d2d", // Dark background color
        color: "#fff", // Text color
        padding: "2rem", // Padding around content
        textAlign: "center", // Center-align text
        borderTop: "2px solid #fff", // White border at the top
        fontFamily: "Montserrat, sans-serif", // Set font family to Montserrat
        position: "relative", // Position relative to make the footer stay at the bottom
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "2rem" }}>BLISS</h2>
        <p>Elevating Reading Pleasure with Exceptional Book Recommendations.</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <a
          href="https://twitter.com/your_twitter"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 1rem",
            fontSize: "2.5rem",
          }}
        >
          <i className="fab fa-twitter social-icon"></i>
        </a>
        <a
          href="https://facebook.com/your_facebook"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 1rem",
            fontSize: "2.5rem",
          }}
        >
          <i className="fab fa-facebook social-icon"></i>
        </a>
        <a
          href="https://instagram.com/your_instagram"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 1rem",
            fontSize: "2.5rem",
          }}
        >
          <i className="fab fa-instagram social-icon"></i>
        </a>
      </div>

      <p style={{ marginTop: "2rem" }}>
        &copy; {new Date().getFullYear()} Your Brand. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
