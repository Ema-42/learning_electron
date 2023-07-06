const fs = require("fs");

const sqlite3 = require("sqlite3").verbose();

const ubicacion = __dirname + "/pc-info.db";
const db = new sqlite3.Database(ubicacion);

// Leer el contenido del archivo
fs.readFile("src/db/pcInfo.json", "utf8", (error, data) => {
  error ? console.error(error) : "";
  try {
    const infoPc = JSON.parse(data);
    console.log("mi data:\n", infoPc);
    console.log(infoPc.Usuarioactual);
  } catch (parseError) {
    console.error(
      "Error al analizar el contenido del archivo JSON:",
      parseError
    );
  }
});

// Datos del nuevo registro a insertar
const nuevoRegistro = {
  ranuras: 2,
  informacion: "ddr4",
};

// Consulta SQL para insertar el registro
const sql = `INSERT INTO memoria (ranuras,informacion) VALUES (?,?)`;

// Ejecutar la consulta
db.run(sql, [nuevoRegistro.ranuras, nuevoRegistro.informacion], function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Nuevo registro insertado. ID: ${this.lastID}`);
});

db.close();
