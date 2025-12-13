import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">TraveLeo</h1>
          <p className="mt-4 text-lg">
            Plan trips • Track expenses • Save smarter
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 border border-white rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Landing;
