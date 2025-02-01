import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config"; // Import Firebase Authentication and Firestore
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // To navigate if not authenticated
import ProcessSection from "../Widget/ProcessSection";
import PendingTickets from "../Widget/PendingTicket";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [credits, setCredits] = useState(0);
  const [pendingTickets, setPendingTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/"); // If no user is logged in, redirect to login
      } else {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setCredits(docSnap.data().credits); // Set the user's credits
        }
      }
    };

    const fetchPendingTickets = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch all pending tickets for the current user
        const ticketsRef = collection(db, "profiles", user.uid, "tickets");
        const q = query(ticketsRef, where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);

        const tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPendingTickets(tickets); // Store pending tickets
      }
    };

    fetchProfile();
    fetchPendingTickets();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-lg">
        {profile ? (
          <div>
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Your Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <strong className="text-lg text-gray-700">Company Name:</strong>
                <p className="text-lg text-gray-600">{profile.companyName}</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-lg text-gray-700">Address:</strong>
                <p className="text-lg text-gray-600">{profile.address}</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-lg text-gray-700">Contact Number:</strong>
                <p className="text-lg text-gray-600">{profile.contactNo}</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-lg text-gray-700">Email:</strong>
                <p className="text-lg text-gray-600">{profile.email}</p>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-lg text-gray-700">Credits:</strong>
                <p className="text-lg text-gray-600">{credits}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading your profile...</p>
        )}
      </div>
      <div>
        <PendingTickets/>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        <ProcessSection />
      </div>
    </div>
  );
};

export default Profile;

