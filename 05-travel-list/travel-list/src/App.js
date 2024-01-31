import { useState } from "react";

export default function App() {
  // lifting state up, means that whenever multiple sibling components needs access to the same state, we move that piece of state up to the first common parent compnent
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // because of react immutability we could not use push method to mutate the original array. hence, we return a new array spreading the items array adding the new item recived to the newly created array.
    setItems((items) => [...items, item]);
  }

  // i dont want to mutate the items array so i use filter to exclude the item with the passed id to the function and return a newly updated array
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  // updating an object in an array
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteButton() {
    const confirmed = window.confirme(
      "Are you sure you want to delete all items ?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form onAdditems={handleAddItems}></Form>
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeletebutton={deleteButton}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAdditems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAdditems(newItem);
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
function PackingList({ items, onDeleteItem, onToggleItem, onDeletebutton }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeletebutton}>Clear list</button>
      </div>
    </div>
  );
}

// controlled element means that the element has a value attribute of some state and an event handler which listens for the change and update the state accordingly
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  // benefit of early return is to avoid doing unneeded calculations on the element if there is no packed items yet!
  if (!items.length)
    return (
      <p className="stats">start adding some items to your packing list 🚀</p>
    );
  const numItems = items.length;
  console.log(items);
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  console.log(percentage);

  return (
    <footer className="stats">
      <em>
        {percentage < 100
          ? `you have ${numItems} items in your list, and you already packed ${packedItems} (${percentage}%)`
          : "you are done, ready to go ✈️"}
      </em>
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

// by lifting stae up, we have succefully shared one pieace of state with multiple components in different positions in the components.

// child to parent communication (inverse data flow): child updating parent state (data "flowing" up), passing a setter function which used to update the state as a prop (through a function)

// Derived state: state that is computed from an existing piace of state or from probs, we bant allow seperate depending poeaces of states exist, that would be problamatic, we need to keep them in sync ( update togeter), and each update the component will be re-rendered
