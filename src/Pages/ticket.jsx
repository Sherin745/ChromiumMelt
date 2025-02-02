import React, { useState, useEffect } from "react";

export default function ChromiumTicket() {
  const [chromiumLevel, setChromiumLevel] = useState("");
  const [treatmentMethod, setTreatmentMethod] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 p-6">
      {!submitted ? (
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-300">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Chromium Disposal Form</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold text-gray-700 text-lg">Enter Chromium Level (ppm):</label>
            <input
              type="number"
              className="w-full p-3 border rounded-xl shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg"
              value={chromiumLevel}
              onChange={(e) => setChromiumLevel(e.target.value)}
              placeholder="Enter level"
              required
            />
            <label className="block mt-4 mb-2 font-semibold text-gray-700 text-lg">Select Disposal Method:</label>
            <select
              className="w-full p-3 border rounded-xl shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg"
              value={treatmentMethod}
              onChange={(e) => setTreatmentMethod(e.target.value)}
              required
            >
              <option value="">Select Method</option>
              <option value="Chemical Precipitation">Chemical Precipitation</option>
              <option value="Ion Exchange">Ion Exchange</option>
              <option value="Reverse Osmosis">Reverse Osmosis</option>
            </select>
            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-300 text-center">
          <h3 className="text-3xl font-bold text-gray-900">Disposal Ticket</h3>
          <p className="text-lg text-gray-700 mt-4">Chromium Level: <span className="font-bold text-red-600">{chromiumLevel} ppm</span></p>
          <p className="text-lg text-gray-700 mt-2">Selected Method: <span className="font-bold text-indigo-600">{treatmentMethod}</span></p>
          <p className="text-lg text-gray-700 mt-4">Thank you for submitting your disposal details. We will review and contact you shortly.</p>
          <button
            className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition"
            onClick={() => setSubmitted(false)}
          >
            Submit Another
          </button>
        </div>
      )}
    </div>
  );
}
