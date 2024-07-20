// src/SortableList.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

const SortableItem = ({ item, index, moveItem }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        padding: '8px',
        margin: '4px',
        backgroundColor: isDragging ? '#ddd' : '#fff',
        border: '1px solid #ccc',
        cursor: 'move',
      }}
    >
      {item}
    </div>
  );
};

const SortableList = ({ items, setItems }) => {
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, removed);
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <SortableItem
          key={item}
          item={item}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

export default SortableList;
