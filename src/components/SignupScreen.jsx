import React, { useState } from "react";

// STEP 01 — Weaver & Buyer Signup
export default function SignupScreen({ onSignupComplete }) {
  const [form, setForm] = useState({
    role: "weaver",
    name: "",
    phone: "",
    language: "English",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Please fill in all fields");
      return;
    }
    // TODO: replace with Firebase Auth + Firestore write to `users/{userId}`
    console.log("New user:", form);
    onSignupComplete(form);
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>I am a:</label>
        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
          <option value="weaver">Weaver</option>
          <option value="buyer">Buyer</option>
          <option value="designer">Designer</option>
          <option value="supplier">Supplier</option>
        </select>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <label>Preferred Language:</label>
        <select name="language" value={form.language} onChange={handleChange} style={styles.input}>
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          <option>Bengali</option>
        </select>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
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
