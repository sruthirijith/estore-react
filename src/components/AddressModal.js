import React, { useEffect, useState } from "react";

const emptyForm = {
  address_type: "HOME",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  make_as_default: false
};

const AddressModal = ({ show, onClose, onSave, editData }) => {
  const [form, setForm] = useState(emptyForm);

  // 🔑 THIS IS THE KEY FIX
  useEffect(() => {
    if (editData) {
      setForm({
        address_type: editData.address_type,
        address_line1: editData.address_line1,
        address_line2: editData.address_line2 || "",
        city: editData.city,
        state: editData.state,
        pincode: editData.pincode,
        country: editData.country,
        make_as_default: editData.is_default || false
      });
    } else {
      setForm(emptyForm);
    }
  }, [editData]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* ✅ Dynamic title */}
        <h5 className="mb-3">
          {editData ? "Edit Address" : "Add Address"}
        </h5>

        <select
          className="form-control mb-2"
          name="address_type"
          value={form.address_type}
          onChange={handleChange}
        >
          <option value="HOME">Home</option>
          <option value="OFFICE">Office</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          className="form-control mb-2"
          name="address_line1"
          placeholder="Address Line 1"
          value={form.address_line1}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="address_line2"
          placeholder="Address Line 2"
          value={form.address_line2}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="makeDefault"
            name="make_as_default"
            checked={form.make_as_default}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="makeDefault">
            Make this my default address
          </label>
        </div>

        <button
          className="btn btn-success w-100 mb-2"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary w-100"
          onClick={onClose}
        >
          Cancel
        </button>
        
      </div>
    </div>
  );
};

export default AddressModal;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "420px",
};
