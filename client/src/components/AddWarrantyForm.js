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

      // Convert warrantyPeriod to number
      if (payload.warrantyPeriod)
        payload.warrantyPeriod = Number(payload.warrantyPeriod);

      // Remove expiry if empty (backend calculates)
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

      // ⭐ show success message
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
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-900 rounded">
      <h3 className="text-lg font-semibold">Add Product / Register</h3>

      <input name="productName" value={form.productName} onChange={update} placeholder="Product name*" className="w-full px-3 py-2 rounded bg-gray-800" />
      <input name="brand" value={form.brand} onChange={update} placeholder="Brand*" className="w-full px-3 py-2 rounded bg-gray-800" />
      <input name="serialNumber" value={form.serialNumber} onChange={update} placeholder="Serial number*" className="w-full px-3 py-2 rounded bg-gray-800" />
      <input name="purchaseDate" value={form.purchaseDate} onChange={update} type="date" className="w-full px-3 py-2 rounded bg-gray-800" />
      <input name="warrantyPeriod" value={form.warrantyPeriod} onChange={update} placeholder="Warranty period (months)" className="w-full px-3 py-2 rounded bg-gray-800" />
      <input name="seller" value={form.seller} onChange={update} placeholder="Seller" className="w-full px-3 py-2 rounded bg-gray-800" />
      <input name="warrantyType" value={form.warrantyType} onChange={update} placeholder="Warranty type" className="w-full px-3 py-2 rounded bg-gray-800" />

      {error && <div className="text-red-400">{error}</div>}
      {success && <div className="text-green-400">{success}</div>}


      <button disabled={loading} className="px-4 py-2 bg-indigo-600 rounded">
        {loading ? "Saving..." : "Register Product"}
      </button>
    </form>
  );
}
