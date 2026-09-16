import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // npm install qrcode.react

// STEP 06 — QR Tagging & Delivery
export default function QRTaggingScreen({ productId = "demo-product-001", weaverName = "Weaver Name" }) {
  const [delivered, setDelivered] = useState(false);
  const [finalPaymentReleased, setFinalPaymentReleased] = useState(false);

  // This is the URL a buyer/customer would land on after scanning the QR.
  const productPageUrl = `https://nooldirect.app/product/${productId}`;

  const releaseFinalPayment = () => {
    // TODO: trigger the 70% milestone payment via Razorpay/Stripe TEST MODE
    console.log("Releasing final 70% payment");
    setFinalPaymentReleased(true);
  };

  const markDelivered = () => {
    // TODO: update `orders/{orderId}.status` to "delivered" in Firestore
    setDelivered(true);
  };

  return (
    <div style={styles.container}>
      <h2>QR Tagging & Delivery</h2>

      <div style={styles.qrBox}>
        <QRCodeCanvas value={productPageUrl} size={180} />
        <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>{productPageUrl}</p>
      </div>

      <div style={styles.card}>
        <p><strong>Product ID:</strong> {productId}</p>
        <p><strong>Woven by:</strong> {weaverName}</p>
        <p>Scanning this QR shows the buyer the weaver's story, materials used, and provenance.</p>
      </div>

      {!finalPaymentReleased ? (
        <button onClick={releaseFinalPayment} style={styles.button}>
          Release Final Payment (70%)
        </button>
      ) : !delivered ? (
        <button onClick={markDelivered} style={styles.button}>
          Mark as Delivered
        </button>
      ) : (
        <p style={styles.done}>✅ Order complete — delivered & fully paid</p>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif", textAlign: "center" },
  qrBox: { background: "#f0f4f8", padding: 20, borderRadius: 8, marginBottom: 12 },
  card: { background: "#fff", border: "1px solid #eee", padding: 12, borderRadius: 8, textAlign: "left", marginBottom: 12 },
  button: {
    padding: 12,
    width: "100%",
    borderRadius: 6,
    border: "none",
    background: "#2b6cb0",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  done: { color: "#38a169", fontWeight: "bold" },
};
