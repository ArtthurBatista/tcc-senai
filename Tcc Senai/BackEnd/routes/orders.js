const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all orders with user information
router.get('/', async (req, res) => {
  try {
    const orders = await pool.query(`
      SELECT o.*, u.name as user_name, u.email as user_email
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create order
router.post('/', async (req, res) => {
  const { user_id, order_date, total_amount, status } = req.body;
  if (!user_id || !order_date || !total_amount) {
    return res.status(400).json({ error: 'User ID, order date e total amount são obrigatórios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)',
      [user_id, order_date, total_amount, status || 'pending']
    );
    res.status(201).json({
      order_id: result.affectedRows.insertId,
      message: 'Pedido criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update order
router.put('/:id', async (req, res) => {
  const { order_date, total_amount, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE orders SET order_date = ?, total_amount = ?, status = ? WHERE order_id = ?',
      [order_date, total_amount, status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json({ message: 'Pedido atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM orders WHERE order_id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
