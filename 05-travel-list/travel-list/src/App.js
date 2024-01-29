import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo></Logo>
      <Form></Form>
      <PackingList></PackingList>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}
// how we render a list in React, we use the map method on the array
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>&times;</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>you have X items in your list, and you already packed X (x%)</em>
    </footer>
  );
}

// controlled elements in React are elements that are controlled by React and not by the DOM itself (input, textarea, select) and we control them by using the value attribute and the onChange event handler, and we use the state to store the value of the input and we update the state with the onChange event handler and we use the value attribute to set the value of the input to the value of the state so we can control the input from React and not from the DOM itself.

// States VS Probs
/*
So as we already know, state is internal data.
So data that is owned by the component in which it is declared,
and we can see that nicely in this small example with two components.
Now, on the other hand, props is external data.
So data that is owned by the parent component,
and you can think of props as function parameters.
So as a communication channel between parent and child components where parents can pass data into children.
State on the other hand can be thought of as the component's memory because it can hold data over time, so across multiple re-renders.
Now state can be updated by the component itself and as we already know, this will then cause the component to be re-rendered by React.
Therefore, we use this mechanism of state to make components interactive.
On the other side props work very differently.
They are read only, so they cannot be modified by the component that is receiving them.
However, and this is something that we haven't learned before, when the child component receives new updated props, that will actually also cause the component to re-render,
and let's actually analyze that here in this code example.
So one of the props that was passed to question is called "Up Votes", and that up votes variable is actually state and the parent component, right?
It's created using the useState Hook and therefore up votes is in fact state.
Now if this piece of state is updated, of course the question component who owns the state will be re-rendered,
but it makes sense that the child component who basically receives that state as props, should also be re-rendered right?
Because how else would the button component be kept in sync with the state that it received as a prop?
So in conclusion, whenever a piece of state is passed as a prop, when that state updates, both components are re-rendered.
So both the component owning the state and the component receiving the state as a prop,
and so this is a very important connection between state and props that you should keep in mind.
Now finally, while state is used by developers to make components interactive, props are used to give the parent component the ability to configure their child components.
So basically props can be seen as settings in child components, which the parent component can define as they wish, and that's it.
*/
// whenever a piece of state is passed as a prob, when that state updates, both components are re-rendered, so both the component owning the state and recieving it(as a prob) thats a connection between states and probs.
