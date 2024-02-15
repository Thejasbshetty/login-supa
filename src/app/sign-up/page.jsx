// signup.jsx
"use client";
import { useState } from "react";
import supabase from "../utilis/Keys";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when signup process starts

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log(error.message);
        setIsLoading(false); // Set loading state to false if signup fails
      } else {
        alert("Check your email for the confirmation link");
      }
    } catch (error) {
      console.error(error.message);
      setIsLoading(false); // Set loading state to false if an error occurs during signup
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignup}>
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
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          
        </form>
        <p className="mt-6 text-center text-black font-bold">
          Already have an account?{" "}
          <a href="/log-in" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
