import React, { useState } from "react";
import { auth, db } from "../firebase/config"; // Import Firebase Authentication and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // For navigation after registration

const RegisterProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setError(""); // Reset error message when toggling form visibility
    setSuccessMessage(""); // Reset success message when toggling form visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !address || !contactNo || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the profile data to Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        companyName,
        address,
        contactNo,
        email: user.email, // This is the authenticated user's email
        credits: 0, // Initial credits set to 0, you can modify later
      });

      // Success message after successful registration
      setSuccessMessage('Registration successful! Please check your email for confirmation.');

      // Optionally, clear the form after successful registration
      setCompanyName('');
      setAddress('');
      setContactNo('');
      setEmail('');
      setPassword('');
      setError(''); // Clear error messages on success

      // Navigate to the profile page after successful registration
      navigate("/profile");
    } catch (err) {
      setError(err.message); // Handle errors (e.g., email already in use)
    }
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

            {/* Display error message if any */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Display success message after successful registration */}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="companyName" className="block text-left text-gray-700">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your company name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block text-left text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="contactNo" className="block text-left text-gray-700">Contact Number</label>
                <input
                  type="text"
                  id="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-left text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-left text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Create a password"
                  required
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

export default RegisterProfile;
