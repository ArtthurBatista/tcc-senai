const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single user
router.get('/:id', async (req, res) => {
    try {
        const [user] = await pool.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [req.params.id]
        );
        if (user.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create user
router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Usuário criado com sucesso'
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Email já cadastrado' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM usuarios WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
