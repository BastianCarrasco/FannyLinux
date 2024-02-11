const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Configurar middleware para permitir CORS
app.use(cors());

// Configurar el servidor para parsear JSON
app.use(express.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuario de la base de datos
  password: '', // Contraseña de la base de datos
  database: 'fannyLinux' // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con la base de datos');
});

app.post('/insertar-menu', (req, res) => {
  const { nombre, tipo, precio, stockG } = req.body;
  const query = `INSERT INTO Menu (nombre, tipo, precio, stockG) VALUES (?, ?, ?, ?)`;
  db.query(query, [nombre, tipo, precio, stockG], (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    }
  });
});

app.delete('/quitar-menu', (req, res) => {
  const { nombre } = req.body;
  const query = `DELETE FROM Menu WHERE nombre = ?`;
  db.query(query, [nombre], (error, results) => {
    if (error) {
      console.error('Error al eliminar en la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar en la base de datos' });
    } else {
      res.status(200).json({ message: 'Datos eliminados correctamente' });
    }
  });
});


// Escuchar en un puerto específico
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
