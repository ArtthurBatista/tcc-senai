import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './checklist.css';

function Checklist() {
  const [items, setItems] = useState([
    { id: 1, text: 'Passaporte', checked: false },
    { id: 2, text: 'Visto', checked: false },
    { id: 3, text: 'Passagens', checked: false },
    { id: 4, text: 'Hospedagem', checked: false },
    { id: 5, text: 'Seguro Viagem', checked: false },
  ]);

  const handleCheck = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }

      return item;
    });
    setItems(updatedItems);
  };
  return(
    <div className="glass-container">
      <div className="checklist">
      <h2>Checklist para Viagem</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
}
export default Checklist;