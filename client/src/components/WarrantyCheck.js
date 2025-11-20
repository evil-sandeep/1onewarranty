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
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Check Product Warranty</h2>

      <div className="flex gap-2">
        <input
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="Enter product serial number"
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          {loading ? "Searching..." : "Check"}
        </button>
        <button
          onClick={clear}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
        >
          Clear
        </button>
      </div>

      {error && <p className="mt-3 text-red-400">{error}</p>}

      {result && (
        <div className="mt-5 p-4 bg-gray-800 rounded-md border border-gray-700">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">{result.productName || "Product"}</h3>
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
                result.isExpired ? "bg-red-800 text-red-300" : "bg-green-800 text-green-200"
              }`}
            >
              {result.isExpired ? "Expired" : "Active"}
            </span>
          </div>

          <div className="mt-3 text-sm space-y-1">
            <div><strong>Brand:</strong> {result.brand || "-"}</div>
            <div><strong>Serial:</strong> {result.serialNumber || "-"}</div>
            <div><strong>Purchase:</strong> {formatDate(result.purchaseDate)}</div>
            <div><strong>Warranty expiry:</strong> {formatDate(result.warrantyExpiry)}</div>
            <div><strong>Seller:</strong> {result.seller || "-"}</div>
            <div><strong>Type:</strong> {result.warrantyType || "-"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
