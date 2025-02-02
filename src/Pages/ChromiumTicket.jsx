import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config"; // Import Firestore and Firebase Authentication
import { getDoc, updateDoc, doc } from "firebase/firestore"; // Import Firestore methods
import { onAuthStateChanged } from "firebase/auth"; // Firebase auth method
import { arrayUnion } from "firebase/firestore"; // Correct arrayUnion import
import { useNavigate } from "react-router-dom";

export default function ChromiumTicket() {
  const navigate = useNavigate();
  const [chromiumLevel, setChromiumLevel] = useState("");
  const [treatmentMethod, setTreatmentMethod] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error state for form submission
  const [user, setUser] = useState(null); // Current authenticated user

  // Navigate to the user's profile
  const handleTicket = () => {
    navigate('/profile');
  };

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user state when authenticated
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chromiumLevel || !treatmentMethod) {
      setError("Please fill in all fields.");
      return;
    }

    if (!user) {
      setError("You must be logged in to submit a disposal ticket.");
      return;
    }

    try {
      // Check if the user has a profile document
      const profileDocRef = doc(db, "profiles", user.uid);
      const profileDocSnap = await getDoc(profileDocRef);

      // If the user does not have a profile, create one
      if (!profileDocSnap.exists()) {
        await updateDoc(profileDocRef, {
          chromiumDisposals: [], // Initialize an empty array for chromiumDisposals
        });
      }

      // Add the chromium disposal ticket to the user's profile in Firestore
      const ticket = {
        chromiumLevel,
        treatmentMethod,
        submittedAt: new Date(),
        isPending: true,   // Mark the ticket as pending initially
        isApproved: false, // Set isApproved to false initially
      };

      // Update the profile with the new disposal ticket
      await updateDoc(profileDocRef, {
        chromiumDisposals: arrayUnion(ticket), // Use arrayUnion correctly
      });

      setSubmitted(true);
      setError(""); // Clear any error messages

      console.log("Disposal ticket added to profile:", user.uid);
    } catch (e) {
      setError("Error submitting form: " + e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      {!submitted ? (
        <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full border border-gray-300">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
            Chromium Disposal Form
          </h2>

          {/* Error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700 text-lg">
                Enter Chromium Level (ppm):
              </label>
              <input
                type="number"
                className="w-full p-4 border rounded-xl shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg"
                value={chromiumLevel}
                onChange={(e) => setChromiumLevel(e.target.value)}
                placeholder="Enter level"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700 text-lg">
                Select Disposal Method:
              </label>
              <select
                className="w-full p-4 border rounded-xl shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg"
                value={treatmentMethod}
                onChange={(e) => setTreatmentMethod(e.target.value)}
                required
              >
                <option value="">Select Method</option>
                <option value="Chemical Precipitation">Chemical Precipitation</option>
                <option value="Ion Exchange">Ion Exchange</option>
                <option value="Reverse Osmosis">Reverse Osmosis</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-4 rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full border border-gray-300 text-center">
          <h3 className="text-3xl font-bold text-gray-900">Disposal Ticket</h3>
          <p className="text-lg text-gray-700 mt-4">
            Chromium Level:{" "}
            <span className="font-bold text-red-600">{chromiumLevel} ppm</span>
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Selected Method:{" "}
            <span className="font-bold text-indigo-600">{treatmentMethod}</span>
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Thank you for submitting your disposal details. We will review and contact you shortly.
          </p>
          <div className="mt-8 flex justify-between space-x-4">
            <button
              className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition"
              onClick={() => setSubmitted(false)}
            >
              Submit Another
            </button>
            <button
              className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition"
              onClick={handleTicket}
            >
              Back to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
