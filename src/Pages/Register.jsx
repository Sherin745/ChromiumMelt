import React, { useState } from 'react';

const RegisterNow = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to toggle the visibility of the registration form
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="bg-indigo-100 min-h-screen py-16">
      <div className="max-w-2xl mx-auto text-center text-black">
        <h2 className="text-4xl font-bold mb-6">Join Us Now</h2>
        <p className="text-lg mb-8">
          Want to stay updated on chromium disposal and sustainability efforts? Register now to get started.
        </p>

        {/* Register Now Button */}
        <button 
          onClick={toggleFormVisibility} 
          className="py-3 px-8 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-200 transition"
        >
          Register Now
        </button>

        {/* Registration Form */}
        {isFormVisible && (
          <div className="mt-12 max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">Create Your Account</h3>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-left text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Enter your full name" 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-left text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Enter your email" 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-left text-gray-700">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Create a password" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 mt-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterNow;
