const mariadb= require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'clients_orders_system', 
    port: 3306,
    waitForConnections: true,
    connectionLimit: 30,
});

module.exports = pool;
