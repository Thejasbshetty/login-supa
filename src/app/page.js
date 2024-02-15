// Home.jsx
"use client";
import { useEffect, useState } from "react";
import supabase from "./utilis/Keys";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.log("Session Error :", error.message);
        else setUser(data ? data.session.user : null);
        console.log("Data :", data);
      } catch (error) {
        console.log("Session Error :", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Sign Out Error :", error.message);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center font-mono">
      <div className="bg-gray-100 rounded-lg p-8 shadow-lg text-black">
        {user ? (
          <div>
            <h1 className="text-5xl mb-4">Profile</h1>
            <div className="mb-6">
              <p className="text-2xl">Email: {user.email}</p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl mb-4 font-bold">Log-In || Sign-Up</h1>
            <div className="flex justify-around mt-6 text-xl">
              <button
                onClick={() => (window.location.href = "/sign-up")}
                className="border-2 px-4 py-1 hover:bg-white hover:text-black transition-all duration-300"
              >
                Sign-Up
              </button>
              <button
                onClick={() => (window.location.href = "/log-in")}
                className="border-2 px-4 py-1 hover:bg-white hover:text-black transition-all duration-300"
              >
                Log-in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
