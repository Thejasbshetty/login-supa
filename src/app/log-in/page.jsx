// login/page.jsx
"use client";
import { useState } from "react";
import supabase from "../utilis/Keys";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return;
      } else {
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Google login error:", error.message);
      } else {
        console.log("Google login successful");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 px-4 py-2 w-full rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 px-4 py-2 w-full rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
          <div>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-200"
            >
              Login with Google
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-black text-bold">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
