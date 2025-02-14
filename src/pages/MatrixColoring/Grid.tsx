import { useEffect, useState } from 'react';

export default function Grid() {
  const matrix = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];
  const [colors, setColors] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [order, setOrder] = useState(new Set());

  const revertColors = () => {
    if (order.size === 0) return; // Stop if no elements

    const keysArray = [...order] as Array<{ i: number; j: number }>; // Convert Set to array to process sequentially
    let index = 0;

    const uncolorNext = () => {
      if (index >= keysArray.length) {
        setOrder(new Set()); // Reset order when all are reverted
        return;
      }

      const { i, j } = keysArray[index]; // Get current element
      setColors((prevColors) => {
        const newColors = prevColors.map((row) => [...row]); // Deep copy
        newColors[i][j] = 0; // Uncolor current box
        return newColors;
      });

      index += 1; // Move to the next element
      setTimeout(uncolorNext, 500); // Wait 500ms before uncoloring the next
    };

    uncolorNext(); // Start the sequence
  };

  useEffect(() => {
    let coloredBoxes = 0;
    let boxesCount = 0;
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        coloredBoxes += colors[i][j] === 1 ? 1 : 0;
        boxesCount += matrix[i][j] === 1 ? 1 : 0;
      }
    }

    if (coloredBoxes === boxesCount) {
      setTimeout(() => {
        revertColors();
      }, 1000);
    }
  }, [colors, order]);

  const handleClick = (i: number, j: number) => {
    if (!colors[i][j]) {
      const tempColors = colors;
      tempColors[i][j] = 1;
      setColors([...tempColors]);

      setOrder((prev) => {
        const newOrder = new Set();
        newOrder.add({ i, j }); // Insert new element first

        prev.forEach((item) => newOrder.add(item));
        return newOrder;
      });
    } else {
      const tempColors = colors;
      tempColors[i][j] = 0;
      setColors([...tempColors]);
      setOrder((prev) => {
        const newOrder = new Set(
          [...prev].filter((item: any) => !(item.i === i && item.j === j))
        );
        return newOrder;
      });
    }
  };
  return (
    <div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row items-center mb-4">
          {row.map((el, colIndex) => (
            <div
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`flex flex-row border-black border-2 ml-4 ${
                !matrix[rowIndex][colIndex] ? 'hidden' : 'block'
              }`}
              key={`${rowIndex}${colIndex}`}
            >
              <div
                className={`w-12 h-12 ${
                  colors[rowIndex][colIndex] ? 'bg-green-700' : 'bg-white'
                } `}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
