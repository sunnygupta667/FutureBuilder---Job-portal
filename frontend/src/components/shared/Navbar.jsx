import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Sun, Moon, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import MainLogo from '/MainLogo.png';
import { useDarkMode } from '@/components/DarkModeContext';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dark, setDark } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const toggleDarkMode = () => setDark(!dark);

  const NavLinks = () => (
    <>
      {user && user.role === 'recruiter' ? (
        <>
          <Link to="/admin/companies" className="hover:text-purple-600">Companies</Link>
          <Link to="/admin/jobs" className="hover:text-purple-600">Jobs</Link>
        </>
      ) : (
        <>
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <Link to="/jobs" className="hover:text-purple-600">Jobs</Link>
          <Link to="/browse" className="hover:text-purple-600">Browse</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          <img src={MainLogo} alt="Logo" className="h-10 w-10 rounded-full" />
          <span className="text-lg font-semibold hidden sm:block">FutureBuilder</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <Button variant="ghost" onClick={toggleDarkMode} className="p-2">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Auth Buttons */}
          {!user ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-700 text-white hover:bg-purple-800">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:scale-105 transition-transform">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {user.role === 'student' && (
                    <div className="flex items-center gap-2">
                      <User2 className="text-purple-600" />
                      <Link to="/profile">
                        <Button variant="link" className="text-purple-600 hover:underline">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="text-red-600" />
                    <Button onClick={logoutHandler} variant="link" className="text-red-600 hover:underline">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-purple-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 py-2 gap-3 text-sm bg-white dark:bg-gray-800 shadow-sm border-t">
          <NavLinks />
          {!user && (
            <>
              <Link to="/login">
                <Button className="w-full bg-purple-600 text-white">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-purple-700 text-white">Signup</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
