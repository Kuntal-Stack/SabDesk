// src/pages/Header.tsx
import React from 'react';
import { Bell, Search, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-white shadow-sm border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchants, transactions..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          {currentUser && (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-600 capitalize">Logged In</p>
              </div>
              <div
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-blue-100 flex items-center justify-center h-full">
                    <UserIcon className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
