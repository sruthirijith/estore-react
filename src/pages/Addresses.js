import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import AddressModal from "../components/AddressModal";
const BASE_URL = process.env.REACT_APP_API_URL;

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const token = localStorage.getItem("access_token");

  // 🔄 Load addresses
  const loadAddresses = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      setAddresses(json.detail?.data || []);
    } catch (err) {
      console.error("Failed to load addresses", err);
    }
  };

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line
  }, []);

  // ⭐ Make default
  const handleMakeDefault = async (id) => {
    await fetch(`${BASE_URL}/address/${id}/make-default`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadAddresses();
  };

  // ❌ Remove address
  const handleRemove = async (id) => {
    if (!window.confirm("Remove this address?")) return;

    await fetch(`${BASE_URL}/address/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadAddresses();
  };

  // ✏️ Edit address
  const handleEdit = (address) => {
    setEditAddress(address);
    setShowModal(true);
  };

  // 💾 Save (Add / Edit)
  const handleSaveAddress = async (payload) => {
    const isEdit = !!editAddress;

    const url = isEdit
      ? `${BASE_URL}/address/${editAddress.id}`
      : `${BASE_URL}/addresses`;

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowModal(false);
      setEditAddress(null);
      loadAddresses();
    } else {
      alert("Failed to save address");
    }
  };

  return (
    <div className="container account-wrapper">
      <div className="row">
        {/* LEFT SIDEBAR */}
        <div className="col-lg-3 col-md-4">
          <ProfileSidebar />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-lg-9 col-md-8 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>My Addresses</h3>
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditAddress(null);
                setShowModal(true);
              }}
            >
              + Add New Address
            </button>
          </div>

          <div className="row">
            {addresses.map((addr) => (
              <div className="col-md-6 mb-4" key={addr.id}>
                <div className="address-card p-3 border rounded">
                  {/* HEADER */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{addr.address_type}</h6>

                    {addr.is_default && (
                      <span className="badge bg-primary">Default</span>
                    )}
                  </div>

                  {/* DETAILS */}
                  <p className="mb-1">{addr.address_line1}</p>
                  {addr.address_line2 && (
                    <p className="mb-1">{addr.address_line2}</p>
                  )}
                  <p className="mb-1">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="mb-2">{addr.country}</p>

                  {/* ACTIONS */}
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEdit(addr)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(addr.id)}
                    >
                      Remove
                    </button>

                    {!addr.is_default && (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleMakeDefault(addr.id)}
                      >
                        Make Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {addresses.length === 0 && (
              <p>No addresses found</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AddressModal
        show={showModal}
        editData={editAddress}
        onClose={() => {
          setShowModal(false);
          setEditAddress(null);
        }}
        onSave={handleSaveAddress}
      />
    </div>
  );
};

export default Addresses;
