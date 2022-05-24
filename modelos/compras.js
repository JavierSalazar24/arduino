"use stric";

//cargar el modulo de mongoose para conectar con la BD de mongodb
var mongoose = require("mongoose");

//utilizar objeto de tipo Schema pa la BD No SQL
var Schema = mongoose.Schema;

//Crear mi objeto "ComprasEsquema" de tipo Schema
var ComprasEsquema = Schema({
  id_articulo: String,
  cantidad: Number,
  monto: Number,
  date: { type: Date, default: Date.now },
});

//exportar el objeto "Compras Esquema" con el nombre "Compras"
module.exports = mongoose.model("Compras", ComprasEsquema);
