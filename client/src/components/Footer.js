// src/components/Footer.jsx
import React from "react";
import {Link} from 'react-router-dom'
import ServiceCenter from "./ServiceCenter";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Grid Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 text-sm text-gray-700">

          <div>
  <h4 className="font-medium text-gray-900 mb-3">Support</h4>

  <ul className="space-y-2">
    <li>
      <Link to="/warrantycheck" className="hover:text-black">
        Warranty Check
      </Link>
    </li>

    <li>
      <Link to="/WarrantyForm" className="hover:text-black">
        Register Product
      </Link>
    </li>

    <li>
      <Link to="/servicecenter" className="hover:text-black">
        Service Center
      </Link>
    </li>

    <li>
      <a
        href="https://wa.me/917377096138?text=Hello%20I%20need%20help%20regarding%20my%20warranty%20issue."
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black"
      >
        Help
      </a>
    </li>
  </ul>
</div>


          <div>
            <h4 className="font-medium text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2">
              <li>  <Link to='/aboutus' className="hover:text-black">About Us</Link></li>
              <li><Link to='/career' className="hover:text-black">Careers</Link> </li>
              <li> <Link to='/contact' className="hover:text-black">Contact</Link> </li>
             
              
             
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">Documentation</a></li>
              <li><a href="#" className="hover:text-black">API</a></li>
              <li><a href="#" className="hover:text-black">Developer Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">Twitter</a></li>
              <li><a href="#" className="hover:text-black">Instagram</a></li>
              <li><a href="#" className="hover:text-black">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-xs text-gray-500">
          <p className="text-center">
            © {new Date().getFullYear()} OneWarranty. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
