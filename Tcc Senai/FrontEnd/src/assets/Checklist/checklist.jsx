import React, { useState, useEffect } from 'react';
import './CheckList.css';

const CheckList = ({ viagemId }) => {
  const LOCAL_STORAGE_KEY = `viagemChecklist_${viagemId}`;

 
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
      console.error("Erro ao carregar do localStorage:", e);
      return [];
    }
  });
  const [taskInput, setTaskInput] = useState('');


  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Erro ao salvar no localStorage:", e);
    }
  }, [tasks, LOCAL_STORAGE_KEY]);

  // Efeito para recarregar as tarefas se 'viagemId' mudar
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    } catch (e) {
      console.error("Erro ao recarregar do localStorage:", e);
      setTasks([]);
    }
  }, [viagemId, LOCAL_STORAGE_KEY]);


  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    const newTask = { 
      id: Date.now(), 
      text: taskInput.trim(), 
      done: false 
    };
    setTasks([...tasks, newTask]);
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

  // Permite adicionar com a tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        handleAddTask();
    }
  };

  return (
    <div className="checklist-component-wrapper">
      <div className="glass-card full-width">
        <h2>Adicionar Item</h2>
        <div className="checklist-form">
          <input
            type="text"
            placeholder="Ex: Passaporte, Protetor solar..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-button" onClick={handleAddTask}>
            Adicionar
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-message">Nenhum item adicionado ainda.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CheckList;