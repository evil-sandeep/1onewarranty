import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddWarrantyForm({ onCreated }) {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.productName || !form.serialNumber || !form.brand || !form.purchaseDate) {
      setError("Please fill required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/warranties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(form)
      });

      if (res.status === 401) {
        // token invalid or expired
        logout();
        navigate("/login", { replace: true, state: { from: "/warrantyForm" } });
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(body.message || "Failed");
      }

      const created = await res.json();
      setSuccess("Product added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setForm({
        productName: "",
        brand: "",
        purchaseDate: "",
        warrantyPeriod: "",
        serialNumber: "",
        seller: "",
        warrantyType: ""
      });
      if (onCreated) onCreated(created);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Product / Register</h2>

      <form onSubmit={submit} className="space-y-3">
        <input name="productName" value={form.productName} onChange={update} placeholder="Product name*" className="w-full border px-3 py-2 rounded" />
        <input name="brand" value={form.brand} onChange={update} placeholder="Brand*" className="w-full border px-3 py-2 rounded" />
        <input name="serialNumber" value={form.serialNumber} onChange={update} placeholder="Serial number*" className="w-full border px-3 py-2 rounded" />
        <input name="purchaseDate" value={form.purchaseDate} onChange={update} type="date" className="w-full border px-3 py-2 rounded" />
        <input name="warrantyPeriod" value={form.warrantyPeriod} onChange={update} placeholder="Warranty period (months)" className="w-full border px-3 py-2 rounded" />
        <input name="seller" value={form.seller} onChange={update} placeholder="Seller" className="w-full border px-3 py-2 rounded" />
        <input name="warrantyType" value={form.warrantyType} onChange={update} placeholder="Warranty type" className="w-full border px-3 py-2 rounded" />

        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}

        <button type="submit" disabled={loading} className="w-full py-2 bg-black text-white rounded">
          {loading ? "Saving..." : "Register Product"}
        </button>
      </form>
    </div>
  );
}
