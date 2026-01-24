import React, { useEffect, useState } from "react";
import "../css/categories.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const UploadProduct = () => {
  /* ===== Upload form state ===== */
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [uploadSubcategories, setUploadSubcategories] = useState([]);
  const [browseSubcategories, setBrowseSubcategories] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");


  /* ===== Preview after upload ===== */
  const [lastUploadedProduct, setLastUploadedProduct] = useState(null);

  /* ===== Dropdown data ===== */
  const [categories, setCategories] = useState([]);
  // const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  /* ===== Browse by subcategory ===== */
  const [browseSubcategory, setBrowseSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const token = localStorage.getItem("access_token");

  /* ===== Fetch initial data ===== */
  useEffect(() => {
  fetchCategories();
  fetchBrands();
  fetchBrowseSubcategories(); // ✅ ADD THIS
}, []);


  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      const result = await res.json();
      setCategories(result?.detail?.data || []);
    } catch {
      setCategories([]);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${BASE_URL}/brands`
        
      );
      const result = await res.json();
      setBrands(result?.detail?.data || []);
    } catch {
      setBrands([]);
    }
  };

  const fetchUploadSubcategories = async (catId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/categories/${catId}/subcategories`
    );
    const result = await res.json();

    setUploadSubcategories(
      Array.isArray(result?.detail?.data)
        ? result.detail.data
        : []
    );
  } catch (err) {
    console.error("Upload subcategory fetch failed", err);
    setUploadSubcategories([]);
  }
};

  const fetchBrowseSubcategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/subcategories`);
    const result = await res.json();

    setBrowseSubcategories(
      Array.isArray(result?.detail?.data)
        ? result.detail.data
        : []
    );
  } catch (err) {
    console.error("Browse subcategory fetch failed", err);
    setBrowseSubcategories([]);
  }
};


  /* ===== Upload product ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand_id", brandId);
    formData.append("subcategory_id", subcategoryId);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${BASE_URL}/products/upload-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();

      setLastUploadedProduct({
        name,
        image_url: result.detail.data.image_url,
      });

      setMessage("✅ Product uploaded successfully!");

      setName("");
      setBrandId("");
      setCategoryId("");
      setSubcategoryId("");
      setPrice("");
      setStock("");
      setFile(null);
    } catch {
      setMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===== Fetch products by subcategory ===== */
  const fetchProductsBySubcategory = async (subcategoryId) => {
    try {
      setLoadingProducts(true);

      const res = await fetch(
        `${BASE_URL}/by-subcategory/${subcategoryId}`
      );
      const result = await res.json();

      setProducts(result?.detail?.data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Product</h2>

      {/* ===== Upload Form ===== */}
      <form onSubmit={handleSubmit} className="card p-4 mt-3">
        <input
          className="form-control form-control-sm mb-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-control form-control-sm mb-2"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          className="form-control form-control-sm mb-2"
          value={categoryId}
          onChange={(e) => {
            const id = e.target.value;

            setCategoryId(id);
            setSubcategoryId("");

            // 🔴 IMPORTANT GUARD
            if (!id) {
              setUploadSubcategories([]);
              return;
            }

            fetchUploadSubcategories(id);
          }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>



        <select
          className="form-control form-control-sm mb-3"
          value={subcategoryId}
          disabled={!uploadSubcategories.length}
          onChange={(e) => {
            const subId = e.target.value;
            setSubcategoryId(subId);

            if (subId) {
              fetchProductsBySubcategory(subId);
            } else {
              setProducts([]);
            }
          }}
        >
          <option value="">Select Subcategory</option>
          {uploadSubcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>



        <input
          className="form-control form-control-sm mb-2"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control form-control-sm mb-2"
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="file"
          className="form-control form-control-sm mb-3"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload Product"}
        </button>

        {message && <p className="mt-3">{message}</p>}
      </form>

      {/* ===== Last Uploaded Preview ===== */}
      {lastUploadedProduct && (
        <div className="mt-4">
          <h5>Last Uploaded Product</h5>
          <img
            src={lastUploadedProduct.image_url}
            alt={lastUploadedProduct.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              border: "1px solid #ddd",
              padding: "5px",
            }}
          />
          <p className="mt-2">{lastUploadedProduct.name}</p>
        </div>
      )}

      <hr className="my-4" />

      {/* ===== Browse Products by Subcategory ===== */}
      <h4>Browse Products</h4>

        <select
          className="form-control mb-3"
          value={browseSubcategory}
          onChange={(e) => {
            const subId = e.target.value;
            setBrowseSubcategory(subId);

            if (subId) {
              fetchProductsBySubcategory(subId);
            } else {
              setProducts([]);
            }
          }}
        >
          <option value="">Select Subcategory</option>
          {browseSubcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>


      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "16px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={p.image_url}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <strong>{p.name}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadProduct;
