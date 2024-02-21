import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [Output, setOutput] = useState("");

  useEffect(
    function () {
      async function getRate() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?{amount}=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        const conversionRate = data.rates[toCurr];
        const converted = amount * conversionRate;
        setOutput(converted);
      }
      if (fromCurr === toCurr) return setOutput(amount);
      getRate();
    },
    [amount, fromCurr, toCurr]
  );
  return (
    <div>
      <input
        placeholder="0"
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT: {Output}</p>
    </div>
  );
}
