import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] dark:bg-[#1e1b2e] py-8 mt-10 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center space-y-5">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#240046] dark:text-white">
          Connect with <span className="text-[#53279e]">FutureBuilder</span>
        </h2>

        {/* Tagline */}
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Made with ❤️ by <span className="font-semibold text-[#5d2fad]">Sunny Gupta</span> | © 2025 FutureBuilder. All rights reserved.
        </p>

        {/* Contact Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm md:text-base">
          {/* Email */}
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-600 text-xl animate-bounce" />
            <a
              href="mailto:sg7472209@gmail.com"
              className="text-[#240046] dark:text-white hover:text-[#6A38C2] font-medium transition-colors duration-200"
            >
              sg7472209@gmail.com
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <FaLinkedin className="text-blue-600 text-xl animate-bounce" />
            <a
              href="https://www.linkedin.com/in/sunny-gupta-a436302b0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#240046] dark:text-white hover:text-[#6A38C2] font-medium transition-colors duration-200"
            >
              LinkedIn Profile
            </a>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-3">
            <FaGithub className="text-black dark:text-white text-xl animate-bounce" />
            <a
              href="https://github.com/sunnygupta667"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#240046] dark:text-white hover:text-[#6A38C2] font-medium transition-colors duration-200"
            >
              GitHub Repositories
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
