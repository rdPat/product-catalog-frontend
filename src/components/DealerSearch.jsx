import React, { useState } from "react";
import axios from "axios";

export default function DealerSearch() {
  const [category, setCategory] = useState("");
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDealers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:8080/api/dealer/available/dealers/${category}`
      );
      setDealers(response.data);
    } catch (err) {
      setError("Failed to fetch dealers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Dealer Search</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={fetchDealers}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {dealers.map((d) => (
          <div key={d.dealerId} className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{d.dealerName}</h2>
            <p><strong>Owner:</strong> {d.ownerName}</p>
            <p><strong>Email:</strong> {d.email}</p>
            <p><strong>Phone:</strong> {d.phoneNo}</p>
            <p><strong>Category:</strong> {d.productCategory}</p>
            <p><strong>City:</strong> {d.city}</p>
            <p><strong>State:</strong> {d.state}</p>
            <p><strong>Country:</strong> {d.country}</p>
            <p><strong>Added Date:</strong> {d.addedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
