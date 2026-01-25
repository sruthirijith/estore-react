import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import AddEditCardModal from "../components/AddEditCardModal";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Payments() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/payment-methods`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    setCards(result.detail.data.data);
    setLoading(false);
  };

  const makeDefault = async (id) => {
    await fetch(`${BASE_URL}/payment-methods/${id}/default`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCards();
  };

  const deleteCard = async (id) => {
    if (!window.confirm("Remove this card?")) return;

    await fetch(`${BASE_URL}/payment-methods/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCards();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <ProfileSidebar />
        </div>

        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Payment Methods</h4>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setEditCard(null);
                setShowModal(true);
              }}
            >
              + Add New Card
            </button>
          </div>

          {loading && <p>Loading cards...</p>}

          <div className="row">
            {cards.map((card) => (
              <div className="col-md-6 mb-4" key={card.id}>
                <div className={`card payment-card ${card.is_default ? "default-card" : ""}`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <strong>•••• •••• •••• {card.last4}</strong>
                      <span className="badge bg-light text-dark">{card.card_brand}</span>
                    </div>

                    <p className="text-muted mt-2">
                      Expires {String(card.expiry_month).padStart(2, "0")}/{card.expiry_year}
                    </p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setEditCard(card);
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteCard(card.id)}
                      >
                        Remove
                      </button>

                      {!card.is_default ? (
                        <button
                          className="btn btn-sm btn-outline-primary ms-auto"
                          onClick={() => makeDefault(card.id)}
                        >
                          Make Default
                        </button>
                      ) : (
                        <span className="badge bg-primary ms-auto">Default</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showModal && (
            <AddEditCardModal
              onClose={() => setShowModal(false)}
              onSuccess={fetchCards}
              editCard={editCard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
