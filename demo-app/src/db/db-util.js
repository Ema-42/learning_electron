// const info = require('../renderer');

const sqlite3 = require('sqlite3').verbose();

const path = __dirname+'/pc-info.db';
const db = new sqlite3.Database(path);

// Datos del nuevo registro a insertar
const nuevoRegistro = {
  nombre: 'pc-windows'
};

// Consulta SQL para insertar el registro
const sql = `INSERT INTO usuario (nombre,fecha) VALUES (?,datetime('now'))`;

// Ejecutar la consulta
db.run(sql, [nuevoRegistro.nombre], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Nuevo registro insertado. ID: ${this.lastID}`);
});

db.close();

console.log('datos : ',info);