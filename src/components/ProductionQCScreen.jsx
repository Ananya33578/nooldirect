import React, { useState } from "react";

// STEP 05 — Production & Quality Check
const STAGES = ["Started", "Midway Photo Uploaded", "QC Passed", "Ready for Delivery"];

export default function ProductionQCScreen({ onNext }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [midwayPhoto, setMidwayPhoto] = useState(null);

  const advanceStage = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMidwayPhoto(URL.createObjectURL(file));
      advanceStage();
    }
  };

  const finish = () => {
    // TODO: update `products/{productId}.status` to "completed" in Firestore
    onNext({ status: "completed" });
  };

  return (
    <div style={styles.container}>
      <h2>Production Tracker</h2>

      <ol style={styles.stageList}>
        {STAGES.map((stage, i) => (
          <li
            key={stage}
            style={{
              ...styles.stageItem,
              color: i <= currentStage ? "#2b6cb0" : "#aaa",
              fontWeight: i === currentStage ? "bold" : "normal",
            }}
          >
            {i < currentStage ? "✅ " : i === currentStage ? "🔄 " : "⬜ "}
            {stage}
          </li>
        ))}
      </ol>

      {currentStage === 0 && (
        <button onClick={advanceStage} style={styles.button}>
          Mark Production Started
        </button>
      )}

      {currentStage === 1 && (
        <div>
          <label>Upload midway progress photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} style={styles.input} />
        </div>
      )}

      {midwayPhoto && <img src={midwayPhoto} alt="midway progress" style={styles.preview} />}

      {currentStage === 2 && (
        <button onClick={advanceStage} style={styles.button}>
          Confirm QC Passed
        </button>
      )}

      {currentStage === 3 && (
        <button onClick={finish} style={styles.button}>
          Proceed to QR Tagging & Delivery
        </button>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" },
  stageList: { listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 },
  stageItem: { fontSize: 15 },
  input: { marginTop: 8 },
  preview: { width: "100%", borderRadius: 8, marginTop: 10 },
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
