import { useEffect, useState } from "react";
import "../css/categories.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Brands = () => {
  const token = localStorage.getItem("access_token");

  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [editBrandName, setEditBrandName] = useState("");

  // ✅ MESSAGE STATES (MUST BE INSIDE COMPONENT)
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* =====================
     LOAD BRANDS
  ====================== */
  const loadBrands = async () => {
    try {
      const res = await fetch(`${BASE_URL}/brands`);
      const json = await res.json();
      setBrands(json?.detail?.data || []);
    } catch (err) {
      console.error("Error loading brands", err);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  /* =====================
     ADD BRAND
  ====================== */
  const addBrand = async () => {
  if (!newBrand.trim()) {
    setError("Brand name cannot be empty");
    setMessage("");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/admin/brands`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newBrand }),
    });

    const result = await res.json();

    // ❌ ERROR CASE
    if (!res.ok || result?.detail?.status !== "Success") {
      setError(
        typeof result?.detail?.error === "string"
          ? result.detail.error
          : "Brand already exists"
      );
      setMessage("");
      return;
    }

    // ✅ SUCCESS CASE (IMPORTANT FIX HERE)
    setMessage(
      typeof result?.detail?.message === "string"
        ? result.detail.message
        : "Brand added successfully ✅"
    );
    setError("");
    setNewBrand("");
    loadBrands();
  } catch (err) {
    setError("Something went wrong");
    setMessage("");
  }
};

  /* =====================
     SELECT BRAND
  ====================== */
  const handleSelectBrand = (id) => {
    setSelectedBrandId(id);
    const brand = brands.find((b) => b.id === Number(id));
    setEditBrandName(brand?.name || "");
  };

  /* =====================
     UPDATE BRAND
  ====================== */
  const updateBrand = async () => {
    if (!selectedBrandId) return;

    await fetch(`${BASE_URL}/brands/${selectedBrandId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editBrandName }),
    });

    loadBrands();
    setMessage("Brand updated successfully ✅");
    setError("");
  };

  /* =====================
     DELETE BRAND
  ====================== */
  const deleteBrand = async () => {
    if (!selectedBrandId) return;

    if (!window.confirm("Are you sure you want to delete this brand?")) return;

    await fetch(`${BASE_URL}/brands/${selectedBrandId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSelectedBrandId("");
    setEditBrandName("");
    setMessage("Brand deleted successfully ✅");
    setError("");
    loadBrands();
  };

  return (
    <div className="admin-categories">
      <h2>Brands</h2>

      {/* ✅ SUCCESS / ERROR MESSAGE */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ADD BRAND */}
      <div className="cat-section">
        <h3>Add Brand</h3>
        <div className="cat-row">
          <input
            className="cat-input"
            placeholder="Brand name"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
          <button className="btn primary" onClick={addBrand}>
            Add
          </button>
        </div>
      </div>

      {/* EDIT / DELETE BRAND */}
      <div className="cat-section">
        <h3>Edit / Delete Brand</h3>

        <select
          className="cat-input"
          value={selectedBrandId}
          onChange={(e) => handleSelectBrand(e.target.value)}
        >
          <option value="">Select brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        {selectedBrandId && (
          <div className="cat-row" style={{ marginTop: "15px" }}>
            <input
              className="cat-input"
              value={editBrandName}
              onChange={(e) => setEditBrandName(e.target.value)}
            />
            <button className="btn primary" onClick={updateBrand}>
              Update
            </button>
            <button className="btn danger" onClick={deleteBrand}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
