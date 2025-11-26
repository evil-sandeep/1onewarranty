// client/src/components/WarrantyCheck.jsx
import React, { useState } from "react";

function formatDate(d) {
  if (!d) return "-";
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

export default function WarrantyCheck() {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const q = serial.trim();
    if (!q) {
      setError("Please enter a serial number");
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/warranties/serial/${encodeURIComponent(q)}`
      );

      if (res.status === 404) {
        setError("No warranty record found for this serial.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        setError("Server error: " + text);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Network error. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setSerial("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white text-black rounded-2xl shadow-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center tracking-tight">
        Check Product Warranty
      </h2>

      <div className="flex gap-3">
        <input
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="Enter product serial number"
          className="
            flex-1 px-4 py-3 
            rounded-xl bg-white 
            border border-gray-300 
            focus:ring-2 focus:ring-black 
            focus:border-black outline-none
            text-gray-800
          "
        />

        <button
          onClick={handleSearch}
          className="
            px-5 py-3 rounded-xl 
            bg-black text-white 
            hover:bg-gray-900 
            transition-all active:scale-95
          "
        >
          {loading ? "Searching..." : "Check"}
        </button>

        <button
          onClick={clear}
          className="
            px-4 py-3 rounded-xl 
            bg-gray-200 
            hover:bg-gray-300 
            transition-all active:scale-95
          "
        >
          Clear
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">{result.productName || "Product"}</h3>

            <span
              className={`
                text-sm font-medium px-3 py-1 rounded-full
                ${result.isExpired 
                  ? "bg-red-100 text-red-700" 
                  : "bg-green-100 text-green-700"}
              `}
            >
              {result.isExpired ? "Expired" : "Active"}
            </span>
          </div>

          <div className="mt-4 text-sm space-y-2 text-gray-700">
            <div><strong className="font-medium">Brand:</strong> {result.brand || "-"}</div>
            <div><strong className="font-medium">Serial:</strong> {result.serialNumber || "-"}</div>
            <div><strong className="font-medium">Purchase:</strong> {formatDate(result.purchaseDate)}</div>
            <div><strong className="font-medium">Warranty Expiry:</strong> {formatDate(result.warrantyExpiry)}</div>
            <div><strong className="font-medium">Seller:</strong> {result.seller || "-"}</div>
            <div><strong className="font-medium">Type:</strong> {result.warrantyType || "-"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
