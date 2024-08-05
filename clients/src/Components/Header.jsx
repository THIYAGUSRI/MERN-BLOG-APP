import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import 'flowbite/dist/flowbite.css';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Navbar className="border-b-2 px-4 lg:px-8">
      <Navbar.Brand href="/">
        <div className="flex items-center text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            THIYAGU
          </span>
          Blog
        </div>
      </Navbar.Brand>

      {/* Links and Search Bar Section */}
      <div className="flex flex-grow gap-4 justify-center items-center">
        <div className="hidden lg:flex items-center max-w-md relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <AiOutlineSearch className="absolute inset-y-0 right-3 my-auto text-gray-500" />
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`hidden lg:block px-3 py-2 ${pathname === '/' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hidden lg:block px-3 py-2 ${pathname === '/about' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
          >
            About
          </Link>
        </div>
      </div>

      {/* Mobile Search Button */}
      <Button className="lg:hidden mr-4" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        <Button aria-label="Toggle dark mode" className="w-12 h-10" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white" pill>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>

      {/* Navbar Collapse for Links */}
      <Navbar.Collapse>
        <Link
          to="/"
          className={`block px-3 py-2 ${pathname === '/' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`block px-3 py-2 ${pathname === '/about' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
        >
          About
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
