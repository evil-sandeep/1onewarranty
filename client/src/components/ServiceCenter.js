// ServiceCenter.jsx
import React from "react";

const PHONE = "917377096138"; // international, no + or dashes

// Default message template
const DEFAULT_MESSAGE = `Hello,
Hello, I need assistance related to my product warranty.

• Name:
• Product Name/Model:
• Date of Purchase:
• Warranty/Serial Number:
• Issue you are facing:

Please check my warranty status and guide me with the next steps !`;

// helper: build whatsapp url
function buildWhatsAppUrl(phone, message) {
  const encoded = encodeURIComponent(message);
  // wa.me is preferred short link; api.whatsapp.com also works
  return `https://wa.me/${phone}?text=${encoded}`;
}

export default function ServiceCenter({ phone = PHONE, defaultMessage = DEFAULT_MESSAGE }) {
  const waUrl = buildWhatsAppUrl(phone, defaultMessage);

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-4">
          Service Center
        </h2>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-8">
          Click the button below to open WhatsApp , so our 
          support team can assist you faster.
        </p>

        {/* WhatsApp Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 
                     bg-green-500 hover:bg-green-600 text-white font-medium 
                     rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          {/* WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M20.52 3.48A11.82 11.82 0 0 0 12 .67 11.86 11.86 0 0 0 .67 12 11.66 11.66 0 0 0 2.7 18.7L1 23l4.45-1.64a11.86 11.86 0 0 0 17-10.36 11.8 11.8 0 0 0-1.93-7.52zM12 21.3a9.3 9.3 0 1 1 9.3-9.3 9.31 9.31 0 0 1-9.3 9.3zm5.14-6.8c-.28-.14-1.64-.81-1.89-.9s-.44-.14-.63.14-.72.9-.89 1.08-.33.2-.61.07a7.66 7.66 0 0 1-2.26-1.39 8.57 8.57 0 0 1-1.59-2c-.17-.28 0-.43.13-.57s.28-.33.42-.49a1.93 1.93 0 0 0 .28-.47.52.52 0 0 0 0-.49c-.07-.14-.63-1.5-.86-2.06s-.46-.48-.63-.49h-.54a1 1 0 0 0-.72.34A3 3 0 0 0 7 8.6a5.24 5.24 0 0 0 .11 2.78 11 11 0 0 0 3.82 5.4c2.27 1.64 3.11 1.78 4.26 1.5a2.78 2.78 0 0 0 1.89-1.33 2.27 2.27 0 0 0 .16-1.33c-.05-.1-.25-.18-.52-.3z" />
          </svg>

          WhatsApp Support
        </a>
      </div>
    </div>
  );
}
