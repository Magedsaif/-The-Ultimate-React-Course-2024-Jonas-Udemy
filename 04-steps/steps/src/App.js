import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

// use state is a hook
// 3 steps inorder to use a state in our code
// 1- we add a new state variable =>>> const [sthg, setSthg] = useState(--default value--)
// 2- use that state variable in JSX
// 3- update the piece of state in some event handler using setSthg, passing the opposite of the current state

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test, setTest] = useState({ name: "jonas" });

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
    // BAD PRACTICE
    // test.name = "fred";
    // setTest({ name: "fred" });
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {/* using conditional rendering */}
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
            {/* {test.name} */}
          </p>
          {/* this is how we handle events in react, we attach a onCliclk Prop over the elements we want to handle and specifiy a function to do sthg] */}
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffffff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffffff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// State is a Data that a component can have and can change over time, necessey for information that it needs to remember throughout app's lifetcycle (like a counter) or data that is fetched from an API (like a list of users) or data that is changed by the user (like a form input),
// State is a component's memory
// "State variable" / "piece of state": A single variable that is stored in a component's state
// updating component's state triggers React tp re-render the component (and its children) and update the DOM (if needed) to match the new state of the component.
// State is a how react keeps the UI in sync with the data, we change the state, we re-render the component, we change the UI.
// it allowas developers to: 1) Update the compnents view (by re-rendering it) 2) Persist data(local variables) between renders (by storing it in state)
