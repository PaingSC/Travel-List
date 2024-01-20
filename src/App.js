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

  // For packing item
  function handleToggleCheck(id) {
    setItem((item) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleCheck={handleToggleCheck}
        />
        <Stats items={items} />
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
    // initialItems.push(newItem);
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

function PackingList({ items, onDeleteItem, onToggleCheck }) {
  const [sortBy, setSortBy] = useState("input");
  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  // Sort by input order
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = items;
  }

  // Sort by description
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  // Sort by packed
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleCheck={onToggleCheck}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={handleSortBy}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleCheck }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleCheck(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const itemsNum = items.length;
  if (!itemsNum)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list✈</em>
      </footer>
    );

  const itemsPacked = items.filter((item) => item.packed).length;
  const itemsPackedPercentage = itemsPacked
    ? Math.round((itemsPacked / itemsNum) * 100)
    : 0;

  return (
    <footer className="stats">
      <em>
        {itemsPackedPercentage === 100
          ? "You got everything! Ready to go ✈"
          : `You have ${itemsNum} items on your list, and you already packed
        ${itemsPacked} (${itemsPackedPercentage}%)`}
      </em>
    </footer>
  );
}
