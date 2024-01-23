import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  // For adding items
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // For deleting items
  function handleDeleteItem(id) {
    setItems((item) => items.filter((item) => item.id !== id));
  }

  // For packing item
  function handleToggleCheck(id) {
    setItems((item) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // For Clearing all list items
  function handleClearList() {
    if (items.length) {
      const confirm = window.confirm(
        "Are you sure you want to delete all items?"
      );
      if (confirm) setItems([]);
    } else alert("Nothing to clear in the list!");
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
          onClearList={handleClearList}
        />
        <Stats items={items} />
      </div>
    </>
  );
}
