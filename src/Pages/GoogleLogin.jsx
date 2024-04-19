import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
        { access_token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      navigate("/", { state: { token: token } });
    } catch (error) {
      console.error("Error registering/login with Google:", error);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
  });

  const handleGoogleLogin = () => {
    // Panggil fungsi loginWithGoogle() atau fungsi serupa di sini
    loginWithGoogle();
    // Tampilkan pesan alert setelah tombol diklik
    alert("Login dengan Google sukses!");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out"
          style={{ width: "250px", height: "40px" }}
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2" />
          <span>{buttonText}</span>
        </button>
      </div>
    </>
  );
}

export default GoogleLogin;
