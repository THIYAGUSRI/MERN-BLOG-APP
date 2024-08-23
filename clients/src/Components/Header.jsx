import { useEffect, useState } from 'react';
import { Navbar, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import 'flowbite/dist/flowbite.css';


const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 px-4 lg:px-8">
      <Navbar.Brand href="/">
        <div className="flex items-center text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            THIYAGU
          </span>
          <span className="ml-2">Blog</span>
        </div>
      </Navbar.Brand>

      {/* Links and Search Bar Section */}
      <div className="flex flex-grow gap-4 justify-center items-center">
        <div className="hidden lg:flex items-center max-w-md relative">
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-indigo-500 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          </form>
          
          <AiOutlineSearch className="absolute inset-y-0 right-3 my-auto text-gray-500" />
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`hidden lg:block px-3 py-2 ${pathname === '/' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hidden lg:block px-3 py-2 ${pathname === '/about' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
          >
            About
          </Link>
        </div>
      </div>

      {/* Mobile Search Button */}
      <Link to='/search'>
      <Button className="lg:hidden mr-4" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      </Link>
      

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        <Button aria-label="Toggle dark mode" className="w-12 h-10" color="gray" pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown 
          arrowIcon={false}
          inline
          label={
            <Avatar 
            alt='user'
            img={currentUser.profilePicture}
            rounded/>
          }>
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>
                Sign Out
              </Dropdown.Item>
              </Link>
          </Dropdown>
        ):
        (
          <Link to="/sign-in">
            <Button className="relative inline-block px-4 py-2 text-transparent bg-transparent rounded-full overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 group-hover:text-white transition duration-300 ease-in-out">
                     Sign In
                  </span>
              <span className="absolute inset-0 bg-white rounded-full m-1 group-hover:bg-transparent transition duration-300 ease-in-out"></span>
           </Button>
         </Link>
        )}
        
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
