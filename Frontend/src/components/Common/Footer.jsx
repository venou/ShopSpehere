import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-12 px-4">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4 text-sm">
            Be the first to know about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off on your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="#" className="hover:text-gray-500">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="#" className="hover:text-gray-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Follow Us</h3>

          <div className="flex items-center space-x-4 mb-6 text-gray-700">
            <TbBrandMeta className="h-5 w-5 hover:text-gray-500 cursor-pointer" />
            <IoLogoInstagram className="h-5 w-5 hover:text-gray-500 cursor-pointer" />
            <RiTwitterXLine className="h-4 w-4 hover:text-gray-500 cursor-pointer" />
          </div>

          <p className="text-gray-500 text-sm mb-1">Call Us</p>
          <p className="text-sm text-gray-700 flex items-center">
            <FiPhoneCall className="mr-2" />
            0123-456-789
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <p className="text-gray-500 text-sm text-center py-4">
          © 2025, CompileTab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
