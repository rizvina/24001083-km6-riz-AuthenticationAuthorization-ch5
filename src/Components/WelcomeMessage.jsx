import React, { useState, useEffect } from "react";
import axios from "axios";

function WelcomeMessage() {
  const [userData, setUserData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fungsi untuk mengambil data pengguna dari server menggunakan Axios
  async function fetchUserData(token) {
    try {
      const response = await axios.get(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Data:", response.data);

      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }

      const userData = response.data;
      console.log("userData", userData);
      return userData;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function getUserData(setIsLoggedIn) {
    const token = localStorage.getItem("token");
    try {
      const userData = await fetchUserData(token);
      if (userData) {
        setUserData(userData);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-8">
      {userData && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome, {userData.data.name}!</h1>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          {showDetails && (
            <div className="rounded-lg p-6 mt-4 border border-gray-300 bg-white">
              <div className="flex justify-start">
                <div className="w-full">
                  <h2 className="text-xl font-bold mb-2">User Details</h2>
                  <p>
                    <strong>Name:</strong> {userData.data.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.data.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;
