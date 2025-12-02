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
    <div className="max-w-xl mx-auto mt-16 p-10 bg-white border border-gray-200 rounded-3xl shadow-sm">
      <h2 className="text-3xl font-semibold text-center tracking-tight text-gray-900">
        Warranty Check
      </h2>

      {/* INPUT + BUTTONS */}
      <div className="mt-8 flex gap-3">
        <input
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="Enter serial number"
          className="
            flex-1 px-5 py-3
            rounded-2xl border border-gray-300
            bg-gray-50 text-gray-900
            focus:ring-2 focus:ring-gray-900
            focus:border-gray-900 outline-none
            transition-all
          "
        />

        <button
          onClick={handleSearch}
          className="
            px-6 py-3 rounded-2xl
            bg-gray-900 text-white
            hover:bg-black
            transition-all active:scale-95
            font-medium
          "
        >
          {loading ? "Searching..." : "Check"}
        </button>

        <button
          onClick={clear}
          className="
            px-5 py-3 rounded-2xl
            bg-gray-100 text-gray-800
            hover:bg-gray-200
            transition-all active:scale-95
            font-medium
          "
        >
          Clear
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
      )}

      {/* RESULT */}
      {result && (
        <div className="mt-8 p-6 rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900">
              {result.productName || "Product"}
            </h3>

            <span
              className={`
                text-sm font-medium px-3 py-1 rounded-full
                ${
                  result.isExpired
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }
              `}
            >
              {result.isExpired ? "Expired" : "Active"}
            </span>
          </div>

          <div className="mt-5 text-sm text-gray-700 space-y-2">
            <p>
              <strong className="font-medium">Brand:</strong>{" "}
              {result.brand || "-"}
            </p>
            <p>
              <strong className="font-medium">Serial:</strong>{" "}
              {result.serialNumber || "-"}
            </p>
            <p>
              <strong className="font-medium">Purchase:</strong>{" "}
              {formatDate(result.purchaseDate)}
            </p>
            <p>
              <strong className="font-medium">Warranty Expiry:</strong>{" "}
              {formatDate(result.warrantyExpiry)}
            </p>
            <p>
              <strong className="font-medium">Seller:</strong>{" "}
              {result.seller || "-"}
            </p>
            <p>
              <strong className="font-medium">Type:</strong>{" "}
              {result.warrantyType || "-"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
