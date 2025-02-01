import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config"; // Import Firestore and Firebase Authentication
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

export default function PendingTickets() {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [user, setUser] = useState(null); // User state to store the authenticated user

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when authenticated
      } else {
        setError("You must be logged in to view pending tickets.");
        setLoading(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Fetch pending tickets for the authenticated user
  useEffect(() => {
    const fetchPendingTickets = async () => {
      if (user) {
        try {
          // Fetch user's profile document from Firestore
          const profileDocRef = doc(db, "profiles", user.uid);
          const profileDocSnap = await getDoc(profileDocRef);

          if (!profileDocSnap.exists()) {
            setError("User profile not found.");
            setLoading(false);
            return;
          }

          const profileData = profileDocSnap.data();

          // Check if the chromiumDisposals array exists and filter pending ones
          const pendingTickets = profileData.chromiumDisposals?.filter(
            (ticket) => ticket.isPending === true
          );

          if (pendingTickets && pendingTickets.length > 0) {
            setPendingTickets(pendingTickets); // Set pending tickets to state
          } else {
            setError("No pending tickets found.");
          }
        } catch (e) {
          setError("Error fetching tickets: " + e.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPendingTickets();
  }, [user]); // Fetch tickets when user is set

  if (loading) {
    return <div>Loading pending tickets...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 p-6">
      {pendingTickets.length === 0 ? (
        <p className="text-center text-gray-500">No pending tickets.</p>
      ) : (
        <div className="space-y-6 max-w-2xl w-full">
          {pendingTickets.map((ticket, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-300"
            >
              <h3 className="text-3xl font-bold text-gray-900">Ticket {index + 1}</h3>
              <p className="text-lg text-gray-700 mt-4">
                <strong>Chromium Level: </strong>
                <span className="font-bold text-red-600">{ticket.chromiumLevel} ppm</span>
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <strong>Selected Treatment Method: </strong>
                <span className="font-bold text-indigo-600">{ticket.treatmentMethod}</span>
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <strong>Status: </strong>
                <span className="font-bold text-yellow-600">Pending</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
