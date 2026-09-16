import React, { useState, useMemo } from "react";

// STEP 03 — Fair-Price Calculation
// price = materialCost + (laborHours * hourlyRate) + margin%
export default function PriceCalculatorScreen({ onNext }) {
  const [materialCost, setMaterialCost] = useState(0);
  const [laborHours, setLaborHours] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(50); // default fair wage/hr in ₹
  const [marginPercent, setMarginPercent] = useState(15);

  const breakdown = useMemo(() => {
    const material = Number(materialCost) || 0;
    const labor = (Number(laborHours) || 0) * (Number(hourlyRate) || 0);
    const subtotal = material + labor;
    const margin = subtotal * ((Number(marginPercent) || 0) / 100);
    const total = subtotal + margin;
    return { material, labor, margin, total };
  }, [materialCost, laborHours, hourlyRate, marginPercent]);

  const submit = () => {
    // TODO: save calculatedPrice to `products/{productId}`
    console.log("Calculated price:", breakdown);
    onNext(breakdown);
  };

  return (
    <div style={styles.container}>
      <h2>Fair-Price Calculator</h2>

      <label>Material Cost (₹)</label>
      <input
        type="number"
        value={materialCost}
        onChange={(e) => setMaterialCost(e.target.value)}
        style={styles.input}
      />

      <label>Labor Hours</label>
      <input
        type="number"
        value={laborHours}
        onChange={(e) => setLaborHours(e.target.value)}
        style={styles.input}
      />

      <label>Hourly Rate (₹)</label>
      <input
        type="number"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
        style={styles.input}
      />

      <label>Margin (%)</label>
      <input
        type="number"
        value={marginPercent}
        onChange={(e) => setMarginPercent(e.target.value)}
        style={styles.input}
      />

      <div style={styles.breakdown}>
        <p>Material: ₹{breakdown.material.toFixed(2)}</p>
        <p>Labor: ₹{breakdown.labor.toFixed(2)}</p>
        <p>Margin: ₹{breakdown.margin.toFixed(2)}</p>
        <h3>Total Fair Price: ₹{breakdown.total.toFixed(2)}</h3>
      </div>

      <button onClick={submit} style={styles.button}>
        Confirm Price & Continue
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "40px auto", display: "flex", flexDirection: "column", gap: 8, fontFamily: "sans-serif" },
  input: { padding: 10, borderRadius: 6, border: "1px solid #ccc" },
  breakdown: { background: "#f0f4f8", padding: 12, borderRadius: 8, marginTop: 10 },
  button: {
    padding: 12,
    borderRadius: 6,
    border: "none",
    background: "#2b6cb0",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
};
