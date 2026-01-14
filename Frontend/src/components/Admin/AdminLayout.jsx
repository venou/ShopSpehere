import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import AdminHomePage from "../../pages/AdminHomePage";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
  };
  return (
    <div className="flex flex-col min-h-screen md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSideBar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggleSideBar}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        {/* Sidebar */}
        <AdminSidebar />
      </div>
      {/* Main Content */}
      <div className="flex-grow overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
