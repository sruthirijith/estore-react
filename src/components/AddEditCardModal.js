import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function AddEditCardModal({ onClose, onSuccess, editCard }) {
  const [form, setForm] = useState({
    card_holder_name: "",
    card_brand: "VISA",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (editCard) {
      setForm({
        card_holder_name: editCard.card_holder_name,
        card_brand: editCard.card_brand, // keep brand
        card_number: "",
        expiry_month: editCard.expiry_month,
        expiry_year: editCard.expiry_year,
      });
    }
  }, [editCard]);

  const submit = async () => {
    const url = editCard
      ? `${BASE_URL}/payment-methods/${editCard.id}`
      : `${BASE_URL}/payment-methods`;

    const method = editCard ? "PUT" : "POST";

    const payload = editCard
      ? {
          card_holder_name: form.card_holder_name,
          expiry_month: Number(form.expiry_month),
          expiry_year: Number(form.expiry_year),
        }
      : {
          card_holder_name: form.card_holder_name,
          card_brand: form.card_brand, // REQUIRED
          card_number: form.card_number,
          expiry_month: Number(form.expiry_month),
          expiry_year: Number(form.expiry_year),
        };

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    onClose();
    onSuccess(); // refresh cards list
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.4)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>{editCard ? "Edit Card" : "Add New Card"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Card Holder Name"
              value={form.card_holder_name}
              onChange={(e) =>
                setForm({ ...form, card_holder_name: e.target.value })
              }
            />

            {/* Card Brand (POST only) */}
            {!editCard && (
              <select
                className="form-select mb-2"
                value={form.card_brand}
                onChange={(e) =>
                  setForm({ ...form, card_brand: e.target.value })
                }
              >
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
              </select>
            )}

            {!editCard && (
              <input
                className="form-control mb-2"
                placeholder="Card Number"
                value={form.card_number}
                onChange={(e) =>
                  setForm({ ...form, card_number: e.target.value })
                }
              />
            )}

            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  placeholder="MM"
                  value={form.expiry_month}
                  onChange={(e) =>
                    setForm({ ...form, expiry_month: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="YYYY"
                  value={form.expiry_year}
                  onChange={(e) =>
                    setForm({ ...form, expiry_year: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submit}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
