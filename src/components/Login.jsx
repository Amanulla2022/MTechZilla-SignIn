import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Both email and password are required.");
      alert("Both email and password are required.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in successfully:", userCredential.user);
        setError("");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError("Failed to sign in. Please check your credentials.");
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
          onClick={handleSignIn}
        >
          Login with Email
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
