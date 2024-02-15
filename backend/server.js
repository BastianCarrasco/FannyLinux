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



app.get('/precio_colaciones', (req, res) => {
  // Query para seleccionar todos los datos del menú
  const query = "SELECT `id_colaciones`, `tipo_colacion`, `valor` FROM `precios_colaciones`";

  // Ejecutar la consulta
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener datos del menú:', error);
      res.status(500).json({ error: 'Error al obtener datos del menú' });
    } else {
      // Enviar los resultados como respuesta
      res.status(200).json(results);
    }
  });
});


app.get('/datosMenu', (req, res) => {
  // Query para seleccionar todos los datos del menú
  const query = 'SELECT * FROM Menu';

  // Ejecutar la consulta
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener datos del menú:', error);
      res.status(500).json({ error: 'Error al obtener datos del menú' });
    } else {
      // Enviar los resultados como respuesta
      res.status(200).json(results);
    }
  });
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

app.put('/actualizar-menu/:id', (req, res) => {
  const { id } = req.params;
  const { stockG } = req.body;

  // Query de actualización
  const sql = "UPDATE Menu SET stockG = ? WHERE id = ?";

  // Ejecutar la consulta en la base de datos utilizando db.query en lugar de connection.query
  db.query(sql, [stockG, id], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al actualizar el menú' });
    } else {
      console.log('Menú actualizado correctamente');
      res.status(200).json({ message: 'Menú actualizado correctamente' });
    }
  });
});

app.get('/datosSemana', (req, res) => {
  // Query para seleccionar todos los datos del menú
  const query = 'SELECT Semana.numero, Dia.dia, Menu.id,Menu.nombre,Menu.tipo,Menu.precio,Semana.stockD FROM Menu JOIN Semana JOIN Dia where Semana.id_menu=Menu.id and Semana.id_dia=Dia.id ';

  // Ejecutar la consulta
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener datos del menú:', error);
      res.status(500).json({ error: 'Error al obtener datos del menú' });
    } else {
      // Enviar los resultados como respuesta
      res.status(200).json(results);
    }
  });
});


app.put('/actualizar-semana/:numero/:id_dia', (req, res) => {
  const { numero, id_dia } = req.params;

  // Verificar si se proporciona stockG en el cuerpo de la solicitud
  const { id_menu } = req.body;
  if (!id_menu) {
    return res.status(400).json({ error: 'El parámetro id_menu es obligatorio' });
  }

  // Query de actualización
  const sql = "UPDATE Semana SET id_menu = ? WHERE numero = ? AND id_dia = ?";

  // Ejecutar la consulta en la base de datos utilizando db.query
  db.query(sql, [id_menu, numero, id_dia], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al actualizar la semana' });
    } else {
      console.log('Semana actualizada correctamente');
      res.status(200).json({ message: 'Semana actualizada correctamente' });
    }
  });
});

app.put('/actualizar-stock/:numero/:id_dia', (req, res) => {
  const { numero, id_dia } = req.params;

  // Verificar si se proporciona el valor de stockD en el cuerpo de la solicitud
  const { stockD } = req.body;
  if (stockD === undefined) {
    return res.status(400).json({ error: 'El parámetro stockD es obligatorio' });
  }

  // Query de actualización con parámetros
  const sql = "UPDATE `Semana` SET `stockD` = ? WHERE `Semana`.`numero` = ? AND `Semana`.`id_dia` = ?";

  // Ejecutar la consulta en la base de datos utilizando db.query con los parámetros
  db.query(sql, [stockD, numero, id_dia], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al actualizar el stock' });
    } else {
      console.log('Stock actualizado correctamente');
      res.status(200).json({ message: 'Stock actualizado correctamente' });
    }
  });
});


app.put('/actualizar-stockG', (req, res) => {
  // Consulta SQL para actualizar stockG en la tabla Menu con la suma de stockD de la tabla Semana
  const sql = `
    UPDATE Menu AS m
    JOIN (
        SELECT id_menu, SUM(stockD) AS total_stockD
        FROM Semana
        GROUP BY id_menu
    ) AS s ON m.id = s.id_menu
    SET m.stockG = s.total_stockD;
  `;

  // Ejecutar la consulta en la base de datos utilizando db.query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al actualizar stockG en la tabla Menu' });
    } else {
      console.log('stockG actualizado correctamente en la tabla Menu');
      res.status(200).json({ message: 'stockG actualizado correctamente en la tabla Menu' });
    }
  });
});








// Escuchar en un puerto específico
const PORT = process.env.PORT || 5150;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
