import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

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
    const confirmed = window.confirm(
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
