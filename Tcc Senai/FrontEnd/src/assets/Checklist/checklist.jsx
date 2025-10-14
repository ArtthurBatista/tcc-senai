import React, { useState } from 'react';
import './CheckList.css';

const CheckList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, done: false }]);
    setTaskInput('');
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Checklist de Viagem</h1>
        <p>Organize tudo que você precisa levar ou fazer</p>
      </div>

      <div className="dashboard-content">
        <div className="glass-card full-width">
          <h2>Adicionar Item</h2>
          <div className="checklist-form">
            <input
              type="text"
              placeholder="Ex: Passaporte, Protetor solar..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button className="add-button" onClick={handleAddTask}>
              Adicionar
            </button>
          </div>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <p className="empty-message">Nenhum item adicionado ainda.</p>
            ) : (
              tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => handleToggle(task.id)}
                    />
                    <span>{task.text}</span>
                  </label>
                  <button className="delete-button" onClick={() => handleDelete(task.id)}>
                    Excluir
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
