import React, { useState, useEffect } from 'react';
import './gastos.css';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Alimentação',
    date: new Date().toISOString().split('T')[0]
  });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(3000);
  const [remainingBudget, setRemainingBudget] = useState(3000);

  const categories = [
    { name: 'Alimentação', color: '#FF6B6B' },
    { name: 'Transporte', color: '#4ECDC4' },
    { name: 'Moradia', color: '#45B7D1' },
    { name: 'Lazer', color: '#FFA07A' },
    { name: 'Saúde', color: '#98D8C8' },
    { name: 'Educação', color: '#F7DC6F' },
    { name: 'Outros', color: '#BB8FCE' }
  ];

  // Inicializar com alguns gastos de exemplo
  useEffect(() => {
    const initialExpenses = [
      { id: 1, description: 'Mercado', amount: 250, category: 'Alimentação', date: '2023-10-15' },
      { id: 2, description: 'Combustível', amount: 180, category: 'Transporte', date: '2023-10-12' },
      { id: 3, description: 'Aluguel', amount: 1200, category: 'Moradia', date: '2023-10-01' },
      { id: 4, description: 'Cinema', amount: 60, category: 'Lazer', date: '2023-10-10' }
    ];
    
    setExpenses(initialExpenses);
    calculateTotals(initialExpenses);
  }, []);

  // Calcular totais
  const calculateTotals = (expensesList) => {
    const total = expensesList.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setTotalExpenses(total);
    setRemainingBudget(monthlyBudget - total);
  };

  // Adicionar novo gasto
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;
    
    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };
    
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    calculateTotals(updatedExpenses);
    
    // Reset form
    setNewExpense({
      description: '',
      amount: '',
      category: 'Alimentação',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Remover gasto
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    calculateTotals(updatedExpenses);
  };

  // Calcular gastos por categoria
  const getExpensesByCategory = () => {
    const categoryTotals = {};
    categories.forEach(cat => {
      categoryTotals[cat.name] = 0;
    });
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });
    
    return categoryTotals;
  };

  // Calcular porcentagem para gráfico de barras
  const getCategoryPercentage = (categoryAmount) => {
    if (totalExpenses === 0) return 0;
    return (categoryAmount / totalExpenses) * 100;
  };

  const categoryTotals = getExpensesByCategory();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Controle de Gastos</h1>
        <p>Acompanhe seus gastos mensais de forma simples e eficiente</p>
        
        <div className="kpis">
          <div className="kpi-card">
            <h2>Orçamento Mensal</h2>
            <p>R$ {monthlyBudget.toFixed(2)}</p>
          </div>
          <div className="kpi-card">
            <h2>Total Gasto</h2>
            <p>R$ {totalExpenses.toFixed(2)}</p>
          </div>
          <div className="kpi-card">
            <h2>Saldo Restante</h2>
            <p style={{ color: remainingBudget >= 0 ? '#4ECDC4' : '#FF6B6B' }}>
              R$ {remainingBudget.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Formulário para adicionar gastos */}
        <div className="glass-card">
          <h2>Adicionar Novo Gasto</h2>
          <form onSubmit={handleAddExpense} className="expense-form">
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="Ex: Almoço, Combustível..."
                required
              />
            </div>
            
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                placeholder="0,00"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
            
            <button type="submit" className="add-button">Adicionar Gasto</button>
          </form>
        </div>

        {/* Gráfico de gastos por categoria */}
        <div className="glass-card">
          <h2>Gastos por Categoria</h2>
          <div className="chart-container">
            {categories.map(cat => (
              <div key={cat.name} className="chart-item">
                <span>{cat.name}</span>
                <div className="bar-bg">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: `${getCategoryPercentage(categoryTotals[cat.name])}%`,
                      background: `linear-gradient(to right, ${cat.color}, ${cat.color}90)`
                    }}
                  ></div>
                </div>
                <span>R$ {categoryTotals[cat.name].toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de gastos recentes */}
        <div className="glass-card full-width">
          <h2>Gastos Recentes</h2>
          <div className="expenses-table-container">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? (
                  expenses
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(expense => (
                      <tr key={expense.id}>
                        <td>{new Date(expense.date).toLocaleDateString('pt-BR')}</td>
                        <td>{expense.description}</td>
                        <td>
                          <span 
                            className="category-tag"
                            style={{ 
                              backgroundColor: categories.find(c => c.name === expense.category)?.color 
                            }}
                          >
                            {expense.category}
                          </span>
                        </td>
                        <td>R$ {expense.amount.toFixed(2)}</td>
                        <td>
                          <button 
                            className="delete-button"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>
                      Nenhum gasto registrado ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distribuição de gastos (gráfico de pizza visual) */}
        <div className="glass-card">
          <h2>Distribuição de Gastos</h2>
          <div className="pie-container">
            {categories.map(cat => {
              if (categoryTotals[cat.name] > 0) {
                return (
                  <div key={cat.name} className="pie-segment">
                    <div 
                      className="pie-color" 
                      style={{ backgroundColor: cat.color }}
                    ></div>
                    <span>{cat.name}</span>
                    <span>{getCategoryPercentage(categoryTotals[cat.name]).toFixed(1)}%</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;