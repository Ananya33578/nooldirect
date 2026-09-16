import React, { useState } from "react";

// STEP 04 — Order & Milestone Payment (30% upfront / 70% on delivery)
export default function OrderPaymentScreen({ totalAmount = 1000, onNext }) {
  const [milestone1Paid, setMilestone1Paid] = useState(false);
  const advance = (totalAmount * 0.3).toFixed(2);
  const remaining = (totalAmount * 0.7).toFixed(2);

  const payAdvance = () => {
    // TODO: integrate Razorpay/Stripe TEST MODE here.
    // For demo: simulate success after a short delay.
    console.log(`Simulating payment of ₹${advance}`);
    setTimeout(() => {
      setMilestone1Paid(true);
    }, 600);
  };

  const continueToProduction = () => {
    onNext({ totalAmount, milestone1Paid: true, milestone2Paid: false });
  };

  return (
    <div style={styles.container}>
      <h2>Order Summary</h2>
      <div style={styles.card}>
        <p>Total Order Value: <strong>₹{totalAmount}</strong></p>
        <p>Milestone 1 (30% advance): ₹{advance}</p>
        <p>Milestone 2 (70% on delivery): ₹{remaining}</p>
      </div>

      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: milestone1Paid ? "50%" : "0%",
          }}
        />
      </div>
      <p style={{ fontSize: 13, color: "#666" }}>
        {milestone1Paid ? "Advance paid — production can begin" : "Awaiting advance payment"}
      </p>

      {!milestone1Paid ? (
        <button onClick={payAdvance} style={styles.button}>
          Pay ₹{advance} to Start
        </button>
      ) : (
        <button onClick={continueToProduction} style={styles.button}>
          Continue to Production
        </button>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" },
  card: { background: "#f0f4f8", padding: 14, borderRadius: 8, marginBottom: 12 },
  progressBar: { background: "#e2e8f0", height: 10, borderRadius: 5, overflow: "hidden" },
  progressFill: { background: "#38a169", height: "100%", transition: "width 0.4s" },
  button: {
    marginTop: 16,
    padding: 12,
    width: "100%",
    borderRadius: 6,
    border: "none",
    background: "#2b6cb0",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
