import { useEffect, useState } from "react";
import "../css/categories.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Categories = () => {
  const token = localStorage.getItem("access_token");

  /* =====================
     CATEGORY STATES
  ====================== */
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

  /* =====================
     SUBCATEGORY STATES
  ====================== */
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");

  /* =====================
     LOAD CATEGORIES
  ====================== */
  const loadCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setCategories(json?.detail?.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* =====================
     ADD CATEGORY
  ====================== */
  const addCategory = async () => {
  if (!newCategory.trim()) return;

  const res = await fetch(`${BASE_URL}/admin/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newCategory }),
  });

  const json = await res.json();

  // ✅ get newly created category
  const createdCategory = json?.detail?.data;

  setNewCategory("");
  await loadCategories();

  // ✅ AUTO-SELECT newly added category
  if (createdCategory?.id) {
    handleCategorySelect(createdCategory.id);
  }
};


  /* =====================
     SELECT CATEGORY
  ====================== */
  const handleCategorySelect = async (id) => {
    setSelectedCategoryId(id);
    setSelectedSubcategoryId("");
    setEditSubcategoryName("");
    setSubcategories([]);

    const cat = categories.find((c) => c.id === Number(id));
    setEditCategoryName(cat?.name || "");

    if (!id) return;

    const res = await fetch(
      `${BASE_URL}/categories/${id}/subcategories`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const json = await res.json();
    setSubcategories(json?.detail?.data || []);
  };

  /* =====================
     UPDATE CATEGORY
  ====================== */
  const updateCategory = async () => {
    if (!selectedCategoryId) return;

    await fetch(`${BASE_URL}/admin/categories/${selectedCategoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editCategoryName }),
    });

    alert("Category updated");
    loadCategories();
  };

  /* =====================
     DELETE CATEGORY
  ====================== */
  const deleteCategory = async () => {
    if (!selectedCategoryId) return;

    if (!window.confirm("Delete this category?")) return;

    await fetch(`${BASE_URL}/admin/categories/${selectedCategoryId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setSelectedCategoryId("");
    setEditCategoryName("");
    setSubcategories([]);
    loadCategories();
  };

  /* =====================
     ADD SUBCATEGORY
  ====================== */
  const addSubcategory = async () => {
    if (!newSubcategory.trim() || !selectedCategoryId) return;

    await fetch(`${BASE_URL}/admin/subcategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newSubcategory,
        category_id: selectedCategoryId,
      }),
    });

    setNewSubcategory("");
    handleCategorySelect(selectedCategoryId);
  };

  /* =====================
     SELECT SUBCATEGORY
  ====================== */
  const handleSubcategorySelect = (id) => {
    setSelectedSubcategoryId(id);
    const sub = subcategories.find((s) => s.id === Number(id));
    setEditSubcategoryName(sub?.name || "");
  };

  /* =====================
     UPDATE SUBCATEGORY
  ====================== */
  const updateSubcategory = async () => {
    if (!selectedSubcategoryId) return;

    await fetch(`${BASE_URL}/admin/subcategories/${selectedSubcategoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editSubcategoryName }),
    });

    alert("Subcategory updated");
    handleCategorySelect(selectedCategoryId);
  };

  /* =====================
     DELETE SUBCATEGORY
  ====================== */
  const deleteSubcategory = async () => {
    if (!selectedSubcategoryId) return;

    if (!window.confirm("Delete this subcategory?")) return;

    await fetch(`${BASE_URL}/admin/subcategories/${selectedSubcategoryId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setSelectedSubcategoryId("");
    setEditSubcategoryName("");
    handleCategorySelect(selectedCategoryId);
  };

  return (
    <div className="admin-categories">
      <h2>Categories</h2>

      {/* ADD CATEGORY */}
      <div className="cat-section">
        <h3>Add Category</h3>
        <div className="cat-row">
          <input
            className="cat-input"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="btn primary" onClick={addCategory}>
            Add
          </button>
        </div>
      </div>

      {/* EDIT CATEGORY */}
      <div className="cat-section">
        <h3>Edit / Delete Category</h3>

        <select
          className="cat-input"
          value={selectedCategoryId}
          onChange={(e) => handleCategorySelect(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {selectedCategoryId && (
          <div className="cat-row" style={{ marginTop: 15 }}>
            <input
              className="cat-input"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
            <button className="btn primary" onClick={updateCategory}>
              Update
            </button>
            <button className="btn danger" onClick={deleteCategory}>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* SUBCATEGORIES */}
      {selectedCategoryId && (
        <div className="cat-section">
          <h3>Subcategories</h3>

          <div className="cat-row">
            <input
              className="cat-input"
              placeholder="New subcategory name"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <button className="btn primary" onClick={addSubcategory}>
              Add
            </button>
          </div>

          <select
            className="cat-input"
            style={{ marginTop: 15 }}
            value={selectedSubcategoryId}
            onChange={(e) => handleSubcategorySelect(e.target.value)}
          >
            <option value="">Select subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          {selectedSubcategoryId && (
            <div className="cat-row" style={{ marginTop: 15 }}>
              <input
                className="cat-input"
                value={editSubcategoryName}
                onChange={(e) => setEditSubcategoryName(e.target.value)}
              />
              <button className="btn primary" onClick={updateSubcategory}>
                Update
              </button>
              <button className="btn danger" onClick={deleteSubcategory}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
