import React, { useState } from "react";
import { Link } from "react-router-dom";
import regimg from "../assets/Register.webp";
import { HiEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, mobile }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border-collapse shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">ShopSphere</h2>
          </div>
          <h2 className=" text-2xl font-bold text-center mb-6">
            Hey there! 👋🏻
          </h2>
          <p className=" text-center mb-4">
            Enter your email and password to Login.
          </p>
          <div className="mb-4 ">
            <label className=" text-sm block font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Name"
              autoComplete="current-name"
            />
          </div>
          <div className="mb-4 ">
            <label className=" text-sm block font-semibold mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
              autoComplete="current-email"
            />
          </div>
          <div className="mb-4 ">
            <label className=" text-sm block font-semibold mb-2">Mobile</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Mobile Number"
              autoComplete="current-mobile"
            />
          </div>
          <div className="mb-4 relative">
            <label className=" text-sm block font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <HiEye /> : <HiEyeOff />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black p-2 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={regimg}
            alt="Login to Account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
