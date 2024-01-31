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
// 3- update the piece of state in some event handler using setSthg, passing the opposite of the current state (better convention to pass a call back function) --updateing state based on current state

export default function App() {
  return (
    <div>
      <Steps></Steps>
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>👉</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read childern prob</p>
        <p>👈</p>
      </StepMessage>
      {/* <Steps></Steps> */}
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test, setTest] = useState({ name: "jonas" });

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    // BAD PRACTICE
    // test.name = "fred";
    // setTest({ name: "fred" });
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
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

          <StepMessage step={step}>
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          {/* this is how we handle events in react, we attach a onCliclk Prop over the elements we want to handle and specifiy a function to do sthg] */}
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              <span>👉</span> Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

// this is already so many probs on a small feature
// children prob
// The 'children' prop is a prop that each React component automatically receives.
// The value of the 'children' prop is exactly what is between the opening
// and the closing tag of the component.
// thats good for making generic and reusable combonent
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
// State is a Data that a component can have and can change over time, necessey for information that it needs to remember throughout app's lifetcycle (like a counter) or data that is fetched from an API (like a list of users) or data that is changed by the user (like a form input),
// State is a component's memory
// "State variable" / "piece of state": A single variable that is stored in a component's state
// updating component's state triggers React tp re-render the component (and its children) and update the DOM (if needed) to match the new state of the component.
// State is a how react keeps the UI in sync with the data, we change the state, we re-render the component, we change the UI.
// it allowas developers to: 1) Update the compnents view (by re-rendering it) 2) Persist data(local variables) between renders (by storing it in state)

// UI AS A FUNCTION OF STATE
// the entire UI is always a representation of all the current states in all components, then A react app is fundamentally all about changing state all ovetr time.
// with state, we view UI as a reflection of data changing over time, we describe that reflection of data using state, event handlers, and JSX
