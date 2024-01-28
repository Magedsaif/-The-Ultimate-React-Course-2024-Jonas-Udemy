import "./App.css";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <Step></Step>
    </div>
  );
}
function Step() {
  const [step, setStep] = useState(1);
  return (
    <div>
      <button onClick={() => setStep((s) => s - 1)}>-</button>
      <p>Step: {step}</p>
      <button onClick={() => setStep((s) => s + 1)}>+</button>
      <Count stepObj={step}></Count>
    </div>
  );
}

function Count(props) {
  const [count, setCount] = useState(0);
  const step = props.stepObj;
  console.log(step);
  return (
    <div>
      <button onClick={() => setCount((c) => c - step)}>-</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + step)}> +</button>
    </div>
  );
}
export default App;
