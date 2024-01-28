import React, { useState } from "react";
import axios from "axios";

function Mail() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    setError("");
    if (!detail.name.trim() || !detail.email.trim()) {
      setError("Name and email are required");
      return;
    }

   
    if (!validateEmail(detail.email)) {
      setError("Please enter a valid email address");
      return;
    }

    
    setIsLoading(true);

    // Make API request
    axios
      .post("https://mailsender-kwjd.onrender.com/subscribe", detail)
      .then((response) => {
        if (response.status === 200) {
          setDetail({ name: "", email: "" });
          setIsLoading(false);
          console.log("You have been subscribed successfully:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <h2>Email Sender App</h2>
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter your name"
            value={detail.name}
            onChange={(e) => setDetail({ ...detail, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            placeholder="Enter your email"
            value={detail.email}
            onChange={(e) => setDetail({ ...detail, email: e.target.value })}
          />
        </div>

        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Subscribe"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Mail;
