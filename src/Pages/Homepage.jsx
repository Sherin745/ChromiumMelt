import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Widget/Login';

function Homepage() {
  return (
 
    <div className="bg-gradient-to-r from-indigo-600 to-pink-500 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-indigo-600 via-pink-500 to-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <h1 className="text-4xl dancing font-extrabold text-white font-dancingScript hover:text-indigo-200 transition">
              Chromium <br /> Melt 
            </h1>
          </a>

          <button
            className="lg:hidden p-2 text-indigo-600"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="lg:flex space-x-10 hidden" id="navbarNav">
            <a href="#about" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">About</a>
            <a href="#updates" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">Updates</a>
            <a href="#signup" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">Login</a>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50 ">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800">About</h2>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Chromium disposal from industrial wastewater is a critical environmental concern due to its toxic nature, 
            particularly when present in high concentrations. Industrial activities like metal plating, leather tanning,
            and dye manufacturing often result in chromium-rich effluents that can contaminate water sources if not 
            properly treated. Effective treatment methods, such as chemical precipitation, ion exchange, and 
            bioremediation, are essential to reduce chromium levels to safe limits. Raising awareness about the dangers
            of chromium pollution and the importance of proper disposal is key to ensuring sustainable practices in 
            industries. Educating workers, regulators, and the public about the harmful effects of chromium exposure 
            on human health and ecosystems can help drive better waste management and regulatory compliance, 
            ultimately protecting water quality and public health.
          </p>
        </div>
      </section>

      {/* Updates Section */}
      <section id="updates" className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800">Latest Updates</h2>
          <p className="mt-6 text-lg text-gray-600">Stay updated with the latest news and announcements.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 px-6">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-6">
              <h5 className="text-2xl font-semibold text-gray-800">Update 1</h5>
              <p className="mt-3 text-gray-600">Improper disposal of chromium waste, especially hexavalent chromium, remains a major environmental issue.</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-6">
              <h5 className="text-2xl font-semibold text-gray-800">Update 2</h5>
              <p className="mt-3 text-gray-600">The U.S. Environmental Protection Agency has been revising guidelines on hazardous waste management, which include updates on the disposal of chromium-containing waste.</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-6">
              <h5 className="text-2xl font-semibold text-gray-800">Update 3</h5>
              <p className="mt-3 text-gray-600">Researchers are exploring new methods of recycling chromium waste, especially in industries like electronics and automotive manufacturing.</p>
            </div>
          </div>
        </div>
      </section>
     <Login/>
     
    {/* Register Now Button */}
    <div className="flex justify-center mt-10">
        <Link to="/register">
          <button className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition">
            Register Now
          </button>
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; 2025 Chromium Melt. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Homepage