import React, { useState, useEffect } from "react";

export default function ChromiumTreatment() {
  const [chromiumLevel, setChromiumLevel] = useState(0);
  const [remainingChromium, setRemainingChromium] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [credits, setCredits] = useState(0);
  const [previousCredits, setPreviousCredits] = useState(0);
  const [treatmentMethod, setTreatmentMethod] = useState("");

  useEffect(() => {
    const storedCredits = localStorage.getItem("userCredits");
    if (storedCredits) {
      setPreviousCredits(parseInt(storedCredits));
    }
  }, []);

  const handleInputChange = (e) => {
    const level = parseFloat(e.target.value);
    setChromiumLevel(level);
    determineTreatment(level);
  };

  const determineTreatment = (level) => {
    let method = "";
    let remaining = 0;
    let risk = "Low";
    let credit = 0;

    if (level > 0 && level <= 50) {
      method = "Chemical Precipitation";
      remaining = level * 0.1;
      risk = "Moderate";
      credit=2;
    } else if (level > 50 && level <= 100) {
      method = "Ion Exchange";
      remaining = level * 0.2;
      risk = "High";
      credit = 1;
    } else if (level > 100) {
      method = "Reverse Osmosis";
      remaining = level * 0.3;
      risk = "Critical";
      credit = 0;
    } else {
      method = "No Treatment Needed";
      remaining = 0;
      risk = "Low";
    }

    setTreatmentMethod(method);
    setRemainingChromium(remaining);
    setRiskLevel(risk);
    setCredits(credit);

    const totalCredits = previousCredits + credit;
    setPreviousCredits(totalCredits);
    localStorage.setItem("userCredits", totalCredits);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-300">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Chromium Treatment Advisor</h2>
        <label className="block mb-4 font-semibold text-gray-700 text-lg">Enter Chromium Level (ppm):</label>
        <input
          type="number"
          className="w-full p-4 border rounded-xl shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg"
          value={chromiumLevel}
          onChange={handleInputChange}
          placeholder="Enter level"
        />
        <div className="mt-6 space-y-4">
          <div className="bg-gray-200 p-4 rounded-xl shadow-lg text-center">
            <p className="text-xl font-semibold text-gray-800">Treatment Method: <span className="text-indigo-600">{treatmentMethod}</span></p>
          </div>
          <div className="bg-gray-200 p-4 rounded-xl shadow-lg text-center">
            <p className="text-xl text-gray-700">Remaining Chromium: <span className="font-bold text-red-600">{remainingChromium.toFixed(2)}</span> ppm</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-xl shadow-lg text-center">
            <p className={`text-xl font-bold ${riskLevel === "Critical" ? "text-red-600" : riskLevel === "High" ? "text-orange-500" : "text-green-600"}`}>
              Risk Level: {riskLevel}
            </p>
          </div>
          <div className="bg-gray-200 p-4 rounded-xl shadow-lg text-center">
            <p className="text-xl text-gray-700">Credits Earned: <span className="font-bold text-green-600">{credits}</span></p>
          </div>
          <div className="bg-gray-300 p-4 rounded-xl shadow-lg text-center">
            <p className="text-xl font-semibold text-gray-800">Previous Credits: <span className="font-bold text-blue-600">{previousCredits}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}