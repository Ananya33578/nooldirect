import React, { useState } from "react";
import SignupScreen from "./components/SignupScreen";
import ProfileBriefScreen from "./components/ProfileBriefScreen";
import PriceCalculatorScreen from "./components/PriceCalculatorScreen";
import OrderPaymentScreen from "./components/OrderPaymentScreen";
import ProductionQCScreen from "./components/ProductionQCScreen";
import QRTaggingScreen from "./components/QRTaggingScreen";

// Simple state-machine navigation through the 6-step flow.
// Replace with react-router if you want real URLs per screen.
const STEPS = [
  "signup",
  "profile",
  "price",
  "payment",
  "production",
  "qr",
];

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [userData, setUserData] = useState({});
  const [priceData, setPriceData] = useState({});

  const goNext = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const step = STEPS[stepIndex];

  return (
    <div>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>NoolDirect</h1>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>
          Step {stepIndex + 1} of {STEPS.length}
        </p>
      </header>

      {step === "signup" && <SignupScreen onSignupComplete={goNext} />}
      {step === "profile" && (
        <ProfileBriefScreen role={userData.role || "weaver"} onNext={goNext} />
      )}
      {step === "price" && <PriceCalculatorScreen onNext={(data) => { setPriceData(data); goNext(data); }} />}
      {step === "payment" && (
        <OrderPaymentScreen totalAmount={priceData.total || 1000} onNext={goNext} />
      )}
      {step === "production" && <ProductionQCScreen onNext={goNext} />}
      {step === "qr" && (
        <QRTaggingScreen
          productId="demo-product-001"
          weaverName={userData.name || "Weaver"}
        />
      )}
    </div>
  );
}

const styles = {
  header: {
    background: "#1a365d",
    color: "#fff",
    padding: "16px 24px",
    textAlign: "center",
  },
};
