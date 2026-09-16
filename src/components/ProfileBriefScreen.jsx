import React, { useState } from "react";

// STEP 02 — Profile / Brief Creation
// Weavers build a portfolio; Buyers submit a product brief.
export default function ProfileBriefScreen({ role, onNext }) {
  const [weaverData, setWeaverData] = useState({
    craftType: "",
    experience: "",
    bio: "",
  });

  const [buyerBrief, setBuyerBrief] = useState({
    productType: "",
    quantity: "",
    budget: "",
    notes: "",
  });

  const handleWeaverChange = (e) =>
    setWeaverData({ ...weaverData, [e.target.name]: e.target.value });

  const handleBuyerChange = (e) =>
    setBuyerBrief({ ...buyerBrief, [e.target.name]: e.target.value });

  const submit = () => {
    // TODO: write to `weaverProfiles/{weaverId}` or attach brief to `orders/{orderId}`
    const payload = role === "weaver" ? weaverData : buyerBrief;
    console.log("Profile/Brief saved:", payload);
    onNext(payload);
  };

  return (
    <div style={styles.container}>
      {role === "weaver" ? (
        <>
          <h2>Build Your Portfolio</h2>
          <input
            name="craftType"
            placeholder="Craft Type (e.g. Khadi Weaving)"
            value={weaverData.craftType}
            onChange={handleWeaverChange}
            style={styles.input}
          />
          <input
            name="experience"
            placeholder="Years of Experience"
            value={weaverData.experience}
            onChange={handleWeaverChange}
            style={styles.input}
          />
          <textarea
            name="bio"
            placeholder="Tell buyers about your craft..."
            value={weaverData.bio}
            onChange={handleWeaverChange}
            style={{ ...styles.input, height: 80 }}
          />
          <button style={styles.button}>Upload Portfolio Images</button>
        </>
      ) : (
        <>
          <h2>Submit a Brief</h2>
          <input
            name="productType"
            placeholder="What do you want made?"
            value={buyerBrief.productType}
            onChange={handleBuyerChange}
            style={styles.input}
          />
          <input
            name="quantity"
            placeholder="Quantity"
            value={buyerBrief.quantity}
            onChange={handleBuyerChange}
            style={styles.input}
          />
          <input
            name="budget"
            placeholder="Budget (₹)"
            value={buyerBrief.budget}
            onChange={handleBuyerChange}
            style={styles.input}
          />
          <textarea
            name="notes"
            placeholder="Additional notes / design references"
            value={buyerBrief.notes}
            onChange={handleBuyerChange}
            style={{ ...styles.input, height: 80 }}
          />
        </>
      )}
      <button onClick={submit} style={styles.button}>
        Save & Continue
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "40px auto", display: "flex", flexDirection: "column", gap: 10, fontFamily: "sans-serif" },
  input: { padding: 10, borderRadius: 6, border: "1px solid #ccc" },
  button: {
    padding: 12,
    borderRadius: 6,
    border: "none",
    background: "#2b6cb0",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
