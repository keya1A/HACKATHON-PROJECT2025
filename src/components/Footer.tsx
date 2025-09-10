import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1a2533] text-center text-gray-300 py-6 mt-8 border-t border-gray-700">
      <div className="flex flex-col items-center space-y-3">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <img
            src="/location.png"
            alt="Location Icon"
            className="h-6 w-6"
          />
          <h2 className="text-base font-semibold">Kerala Travel Platform</h2>
        </div>

        {/* NATPAC Line */}
        <p className="text-sm">
          Developed in collaboration with{" "}
          <span className="font-medium">NATPAC</span> to support sustainable
          transportation planning
        </p>

        {/* Copyright / Team */}
        <p className="text-sm font-semibold text-gray-300">
          © 2025 Team Peregrine25. All rights reserved.
        </p>

        {/* Store Badges */}
        <div className="flex space-x-4 mt-2">
          {/* Google Play */}
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-8"
            />
          </a>

          {/* Apple Store */}
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
