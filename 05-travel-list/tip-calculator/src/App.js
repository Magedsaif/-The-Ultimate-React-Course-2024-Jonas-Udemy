import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [billInput, setBillInput] = useState("");
  const [mySatisfaction, setMySatisfaction] = useState(0);
  const [friendSatisfaction, setFriendSatisfaction] = useState(0);

  function handleReset() {
    setBillInput("");
    setMySatisfaction(0);
    setFriendSatisfaction(0);
  }

  return (
    <div>
      <BillInput billInput={billInput} onBillInput={setBillInput}></BillInput>

      <SelectPercentage
        percentage={mySatisfaction}
        onSelect={setMySatisfaction}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        percentage={friendSatisfaction}
        onSelect={setFriendSatisfaction}
      >
        How did your friend like the service?
      </SelectPercentage>

      {billInput > 0 && (
        <>
          <Output
            billInput={billInput}
            mySatisfaction={mySatisfaction}
            friendSatisfaction={friendSatisfaction}
          ></Output>
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ billInput, onBillInput }) {
  return (
    <div>
      <p>
        How much was the bill?
        <input
          value={billInput}
          onChange={(e) => onBillInput(Number(e.target.value))}
        ></input>
      </p>
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  // will be dublicated into anoter select
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}
function Output({ billInput, mySatisfaction, friendSatisfaction }) {
  const tip = billInput * ((mySatisfaction + friendSatisfaction) / 2 / 100);
  const totalPay = tip + billInput;
  return (
    <h2>
      you pay ${totalPay} (${billInput} + ${tip})
    </h2>
  );
}
function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
