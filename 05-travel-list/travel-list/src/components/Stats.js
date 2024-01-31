export default function Stats({ items }) {
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
