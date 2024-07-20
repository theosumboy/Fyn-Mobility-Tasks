// src/App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SortableList from './SortableList';

const App = () => {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <SortableList items={items} setItems={setItems} />
    </DndProvider>
  );
};

export default App;
