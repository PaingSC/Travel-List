import { useState } from "react";

export default function Form({ onAddItems }) {
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
