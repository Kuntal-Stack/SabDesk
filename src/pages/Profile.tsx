import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
      <div className="space-y-3 text-sm">
        <p><strong>Name:</strong> {currentUser.displayName || 'N/A'}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>UID:</strong> {currentUser.uid}</p>
        <p><strong>Phone:</strong> {currentUser.phoneNumber || 'Not linked'}</p>
        <p><strong>Email Verified:</strong> {currentUser.emailVerified ? 'Yes' : 'No'}</p>
        <p><strong>Last Login:</strong> {currentUser.metadata.lastSignInTime}</p>

        {currentUser.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full border mt-4"
          />
        )}

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
