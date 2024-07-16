import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const clearError = () => setError("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        throw new Error("Both email and password are required.");
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User logged in successfully:", userCredential.user);
      clearError();
      navigate("/timer");
    } catch (signInError) {
      if (
        signInError.code === "auth/user-not-found" ||
        signInError.code === "auth/invalid-credential"
      ) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User signed up successfully:", userCredential.user);
          clearError();
          // Log in immediately after sign up
          const signInUserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          console.log(
            "User logged in successfully:",
            signInUserCredential.user
          );
          navigate("/timer");
        } catch (signUpError) {
          console.error("Error signing up:", signUpError);
          setError(`Failed to sign up. ${signUpError.message}`);
        }
      } else {
        console.error("Error logging in:", signInError);
        setError(`Failed to log in. ${signInError.message}`);
      }
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Google:", result.user);
        setError("");
        navigate("/timer");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        setError(`Failed to sign in with Google. ${error.message}`);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-100 shadow-md rounded-lg p-6 lg:w-2/5 w-full border-gray-500 border-2 flex flex-col items-center gap-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleSignUp}
        >
          Login/Signup with Email
        </button>
        <button
          className="flex justify-center items-center gap-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle /> | Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
