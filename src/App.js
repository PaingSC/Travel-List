import { useState } from "react";

export default function App() {
  // For adding items
  const [items, setItem] = useState([]);
  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  // For deleting items
  function handleDeleteItem(id) {
    setItem((item) => items.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList items={items} onDeleteItem={handleDeleteItem} />
        <Stats />
      </div>
    </>
  );
}
function Logo() {
  return <h1>🏝 Far Away💼</h1>;
}

function Form({ onAddItems }) {
  // For accessing input field (description)
  const [description, setDescription] = useState("");
  function handleDescription(e) {
    setDescription(e.target.value);
  }

  // For accessing select-option (quantity)
  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (e) => setQuantity(Number(e.target.value));

  // For form submitting
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);
    // initialItems.push(newItem);
    // console.log(initialItems);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>What do you need for your 😍 trip?</h2>
      <select value={quantity} onChange={handleQuantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((cur) => (
          <option value={cur} key={cur}>
            {cur}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleDescription}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em> You have x items on your list, and you alread6 packed X (x%)</em>
    </footer>
  );
}
