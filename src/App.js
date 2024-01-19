import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: true },
];

export default function App() {
  return (
    <>
      <div className="app">
        <Logo />
        <Form />
        <PackingList />
        <Stats />
      </div>
    </>
  );
}
function Logo() {
  return <h1>🏝 Far Away💼</h1>;
}

function Form() {
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
      <button>❌</button>
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
