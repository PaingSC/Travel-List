export default function Stats({ items }) {
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
