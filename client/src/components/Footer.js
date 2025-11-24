// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = ({
  brandName = "TechStartup",
  logoSrc = "https://images.unsplash.com/photo-1563906267088-b029e7101114",
  siteMap = defaultSiteMap(),
  socialLinks = defaultSocialLinks(),
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* subtle watermark / background brand text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold text-[#2c9c49] whitespace-nowrap">
          {brandName}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <img
              src={logoSrc}
              alt={`${brandName} logo`}
              className="h-12 w-auto mb-4 object-contain rounded-md hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm leading-6 border-l-2 border-[#2c9c49] pl-4 backdrop-blur-sm bg-gray-900/50 p-4 rounded-r-lg">
              Innovating the future, one solution at a time. We’re committed to
              delivering exceptional value and transforming ideas into reality.
            </p>
          </div>

          {siteMap.map((section, index) => (
            <nav
              key={index}
              aria-label={section.title}
              className="backdrop-blur-sm bg-gray-900/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-[#2c9c49] tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm hover:text-[#2c9c49] transition-colors duration-300 hover:translate-x-2 inline-block focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href || "#"}
                        className="text-sm hover:text-[#2c9c49] transition-colors duration-300 hover:translate-x-2 inline-block focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#2c9c49]/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#2c9c49]">
              © {currentYear} {brandName}, Inc. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0" role="navigation" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-[#2c9c49] transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
                >
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ---------- helpers & defaults below ---------- */

function defaultSiteMap() {
  return [
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Careers", to: "/careers" },
        { label: "Press", to: "/press" },
        { label: "Blog", to: "/blog" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Features", to: "/features" },
        { label: "Solutions", to: "/solutions" },
        { label: "Pricing", to: "/pricing" },
        { label: "Documentation", href: "/docs" },
        { label: "Resources", to: "/resources" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
        { label: "Cookie Policy", to: "/cookies" },
        { label: "Security", to: "/security" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", to: "/help" },
        { label: "Status", href: "https://status.example.com" },
        { label: "API", to: "/api" },
        { label: "Community", to: "/community" },
        { label: "Feedback", to: "/feedback" },
      ],
    },
  ];
}

function defaultSocialLinks() {
  return [
    { icon: <FaFacebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedin />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaGithub />, url: "https://github.com", label: "GitHub" },
  ];
}
