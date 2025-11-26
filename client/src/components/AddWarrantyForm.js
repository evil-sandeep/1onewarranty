import React, { useState } from "react";

export default function AddWarrantyForm({ onCreated }) {
  const [form, setForm] = useState({
    productName: "",
    brand: "",
    purchaseDate: "",
    warrantyPeriod: "",
    serialNumber: "",
    seller: "",
    warrantyType: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.productName || !form.serialNumber || !form.brand || !form.purchaseDate) {
      setError("Please fill required fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = { ...form };

      if (payload.warrantyPeriod)
        payload.warrantyPeriod = Number(payload.warrantyPeriod);

      if (!payload.warrantyExpiry) delete payload.warrantyExpiry;

      const res = await fetch("http://localhost:5000/api/warranties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || "Failed to add");
      }

      const created = await res.json();
      if (onCreated) onCreated(created);

      setForm({
        productName: "",
        brand: "",
        purchaseDate: "",
        warrantyPeriod: "",
        serialNumber: "",
        seller: "",
        warrantyType: ""
      });

      setSuccess("Product added successfully!");
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      console.error(err);
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-4 p-6 
        bg-white rounded-2xl 
        shadow-lg border border-gray-200
      "
    >
      <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
        Add Product / Register
      </h3>

      {/* INPUT FIELD STYLE (Apple-like) */}
      <div className="space-y-3">
        <input
          name="productName"
          value={form.productName}
          onChange={update}
          placeholder="Product name*"
          className="
            w-full px-4 py-3
            rounded-xl bg-white
            border border-gray-300
            placeholder-gray-400
            focus:ring-2 focus:ring-black
            focus:border-black outline-none
            transition
          "
        />

        <input
          name="brand"
          value={form.brand}
          onChange={update}
          placeholder="Brand*"
          className="
            w-full px-4 py-3 rounded-xl bg-white
            border border-gray-300 placeholder-gray-400
            focus:ring-2 focus:ring-black focus:border-black outline-none
          "
        />

        <input
          name="serialNumber"
          value={form.serialNumber}
          onChange={update}
          placeholder="Serial number*"
          className="
            w-full px-4 py-3 rounded-xl bg-white
            border border-gray-300 placeholder-gray-400
            focus:ring-2 focus:ring-black focus:border-black outline-none
          "
        />

        <input
          name="purchaseDate"
          value={form.purchaseDate}
          onChange={update}
          type="date"
          className="
            w-full px-4 py-3 rounded-xl bg-white
            border border-gray-300 placeholder-gray-400
            focus:ring-2 focus:ring-black focus:border-black outline-none
          "
        />

        <input
          name="warrantyPeriod"
          value={form.warrantyPeriod}
          onChange={update}
          placeholder="Warranty period (months)"
          className="
            w-full px-4 py-3 rounded-xl bg-white
            border border-gray-300 placeholder-gray-400
            focus:ring-2 focus:ring-black focus:border-black outline-none
          "
        />

        <input
          name="seller"
          value={form.seller}
          onChange={update}
          placeholder="Seller"
          className="
            w-full px-4 py-3 rounded-xl bg-white
            border border-gray-300 placeholder-gray-400
            focus:ring-2 focus:ring-black focus:border-black outline-none
          "
        />

        <input
          name="warrantyType"
          value={form.warrantyType}
          onChange={update}
          placeholder="Warranty type"
          className="
            w-full px-4 py-3 rounded-xl bg-white
            border border-gray-300 placeholder-gray-400
            focus:ring-2 focus:ring-black focus:border-black outline-none
          "
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm font-medium">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm font-medium">{success}</div>
      )}

      {/* BUTTON */}
      <button
        disabled={loading}
        className="
          w-full py-3 mt-2
          bg-black text-white
          rounded-xl font-medium
          hover:bg-gray-900 active:scale-95
          transition
        "
      >
        {loading ? "Saving..." : "Register Product"}
      </button>
    </form>
  );
}
