const express = require('express');
const router = express.Router();
const pool = require('../db');  // Sua conexão com o MariaDB
const bcrypt = require('bcrypt');  // Para hashear senhas
const cors = require('cors');
router.use(cors());  

// 1. GET /clientes - Lista todos os clientes
router.get('/', async (req, res) => {
  let conn;
  try {
    console.log('Conectando ao banco...');
    conn = await pool.getConnection();
    console.log('Buscando todos os clientes...');
    
    const rows = await conn.query('SELECT * FROM clientes');
    console.log('Clientes encontrados:', rows ? rows.length : 0);
    console.log('Dados:', rows);
    
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum cliente encontrado' });
    }
    
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) {
      console.log('Fechando conexão...');
      conn.release();
    }
  }
});

// 2. GET /clientes/:id - Busca um client específico
router.get('/:id', async (req, res) => {
  let conn;
  const { id } = req.params;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Client não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
});

// 3. POST /register - Cadastra um novo client (para a página de cadastro)
router.post('/', async (req, res) => {
  let conn;
  console.log('Recebendo requisição POST:', req.body);
  
  const { nome, email, senha, password } = req.body;
  const finalPassword = senha || password;

  if (!nome || !email || !finalPassword) {
    console.log('Dados faltando:', { nome, email, senhaRecebida: !!finalPassword });
    return res.status(400).json({ 
      message: 'Todos os campos são obrigatórios',
      received: { nome, email }
    });
  }

  try {
    console.log('Tentando conectar ao banco...');
    conn = await pool.getConnection();
    
    console.log('Verificando se email já existe...');
    const existingUser = await conn.query('SELECT id FROM clientes WHERE email = ?', [email]);
    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    console.log('Criando hash da senha...');
    const hashedPassword = await bcrypt.hash(finalPassword, 10);
    
    console.log('Inserindo novo cliente...');
    const result = await conn.query(
      'INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );
    
    console.log('Cliente cadastrado com sucesso:', result);
    res.status(201).json({ 
      message: 'Cliente cadastrado com sucesso', 
      clientId: Number(result.insertId), // Convert BigInt to Number
      client: { nome, email }
    });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Erro ao cadastrar cliente no banco de dados'
    });
  } finally {
    if (conn) {
      console.log('Fechando conexão com o banco...');
      conn.release();
    }
  }
});

// 4. POST /login - Faz login para clientes (para a página de login)
router.post('/login', async (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) {
    return res.status(400).json({ message: 'nome e senha são obrigatórios' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE nome = ?', [nome]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const clientes = rows[0];
    const match = await bcrypt.compare(senha, clientes.senha);  // Compara a senha hasheada
    if (!match) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    res.json({ message: 'Login bem-sucedido', clientId: clientes.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. PUT /clientes/:id - Atualiza um client
router.put('/:id', async (req, res) => {
  let conn;
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    conn = await pool.getConnection();
    
    let updateQuery = 'UPDATE clientes SET nome = ?, email = ?';
    const params = [nome, email];

    if (senha) {
      const hashedPassword = await bcrypt.hash(senha, 10);
      updateQuery += ', senha = ?';
      params.push(hashedPassword);
    }

    updateQuery += ' WHERE id = ?';
    params.push(id);

    const result = await conn.query(updateQuery, params);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.json({ 
      message: 'Cliente atualizado com sucesso',
      updatedId: id
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
});

// 6. DELETE /clientes/:id - Deleta um client
router.delete('/:id', async (req, res) => {
  let conn;
  const { id } = req.params;

  try {
    conn = await pool.getConnection();
    
    // First check if client exists
    const checkClient = await conn.query('SELECT id FROM clientes WHERE id = ?', [id]);
    if (!checkClient || checkClient.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Perform delete operation
    const result = await conn.query('DELETE FROM clientes WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Erro ao deletar cliente' });
    }
    
    res.json({ 
      message: 'Cliente deletado com sucesso',
      deletedId: Number(id)
    });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

module.exports = router;