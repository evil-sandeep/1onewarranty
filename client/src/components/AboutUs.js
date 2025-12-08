// src/components/AboutUs.jsx
import React from "react";

const Feature = ({ icon, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-none w-12 h-12 rounded-xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{children}</p>
    </div>
  </div>
);

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                About OneWarranty
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Simple. Reliable. Digital warranty management for your devices and appliances — register products,
                verify warranty status, and contact service quickly.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
                <div className="text-right">
                  <div className="inline-flex items-center gap-3 rounded-lg bg-white/60 p-3">
                    <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 8.5a8.5 8.5 0 11-16.34-3.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5 12.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="text-sm">
                      <div className="text-xs text-gray-500">Trusted</div>
                      <div className="text-sm font-medium text-gray-800">Secure warranty records</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/warrantycheck"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium shadow hover:brightness-95 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Check Warranty
            </a>

            <a
              href="/warrantyform"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 font-medium hover:shadow-sm transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Register Product
            </a>
          </div>
        </div>

        {/* Grid: Mission + Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Our mission</h3>
            <p className="mt-3 text-gray-600">
              To make warranty management effortless. We help customers protect purchases by providing instant warranty
              verification, easy registration, and fast access to service — all in a beautiful, secure interface.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Feature
                title="Instant Warranty Check"
                icon={
                  <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Search by serial, order id or email and view warranty status in seconds.
              </Feature>

              <Feature
                title="Register Products"
                icon={
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7h18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 3v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Save receipts and warranty details digitally — never lose your purchase records.
              </Feature>

              <Feature
                title="Direct Service Support"
                icon={
                  <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 14l3-3 3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Contact service centers directly via WhatsApp with pre-filled messages.
              </Feature>

              <Feature
                title="Smart Alerts"
                icon={
                  <svg className="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 20h10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Receive reminders before your warranty expires (coming soon).
              </Feature>
            </div>
          </div>

          {/* Why choose us */}
          <aside className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Why choose OneWarranty?</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600">✔</span>
                <span>Fast and accurate warranty checks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600">✔</span>
                <span>Secure cloud storage for receipts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600">✔</span>
                <span>Direct contact to service centers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-600">✔</span>
                <span>Clean UI with quick actions</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* Story + Values */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Our story</h3>
            <p className="mt-3 text-gray-600">
              OneWarranty was created to solve a simple but painful problem: people lose receipts, warranties get forgotten,
              and service becomes a hassle. We built a lightweight platform that stores warranty information, simplifies
              verification, and connects customers to service centers quickly.
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900">Values</h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="font-medium text-gray-800">Transparency</div>
                  <div className="mt-1">Clear, honest warranty info and processes.</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="font-medium text-gray-800">Reliability</div>
                  <div className="mt-1">Dependable records and quick support.</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="font-medium text-gray-800">Security</div>
                  <div className="mt-1">We protect your data with industry best practices.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Contact & Support</h3>
            <p className="mt-3 text-sm text-gray-600">
              For quick help, contact our service center on WhatsApp:
            </p>

            <a
              href="https://wa.me/917377096138?text=Hello%20I%20need%20assistance%20with%20my%20warranty."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:brightness-95 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8.5a8.5 8.5 0 11-16.34-3.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 12.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              WhatsApp Support
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Frequently asked questions</h3>

          <div className="mt-4 grid gap-4">
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <summary className="font-medium text-gray-900 cursor-pointer">How do I check my warranty?</summary>
              <div className="mt-2 text-sm text-gray-600">
                Use the warranty check tool — enter your serial number or order ID and we will show the warranty status.
              </div>
            </details>

            <details className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <summary className="font-medium text-gray-900 cursor-pointer">How do I register a product?</summary>
              <div className="mt-2 text-sm text-gray-600">
                Go to Register Product, fill the form with purchase details and upload an invoice (optional). The product will be saved to your account.
              </div>
            </details>

            <details className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <summary className="font-medium text-gray-900 cursor-pointer">Is my data secure?</summary>
              <div className="mt-2 text-sm text-gray-600">
                Yes — we follow best practices for data security. We never share your personal information without consent.
              </div>
            </details>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} OneWarranty — digital warranty management made simple.
        </p>
      </div>
    </section>
  );
}
