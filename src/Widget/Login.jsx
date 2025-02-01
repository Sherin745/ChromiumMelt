import React, { useState } from 'react';
import { auth } from '../firebase/config'; // Import the Firebase auth module
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the sign-in method from Firebase Auth

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to '/process' after successful login
      navigate('/profile');
    } catch (err) {
      // Check if the error is a Firebase Auth error
      if (err.code === 'auth/user-not-found') {
        alert('No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert('Error: ' + err.message);
      }
    }
  };

  return (
    <div>
      {/* Login Section */}
      <section id="signup" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800">Login</h2>
          {error && <p className="text-red-500 mt-4">{error}</p>} {/* Error message */}
          <div className="mt-12 max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-left text-gray-700">Email address</label>
                <input
                  type="email"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-left text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6 flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" id="rememberMe" />
                <label className="ml-3 text-gray-700" htmlFor="rememberMe">Remember me</label>
              </div>
              <button
                type="submit"
                className="w-full py-4 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
