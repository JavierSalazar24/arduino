"use stric";

//cargar el modulo de mongoose
var mongoose = require("mongoose");

//utilizar objeto de tipo Schema para la BD No SQL
var Schema = mongoose.Schema;

//Crear mi objeto "ArticuloEsquema" de tipo Schema
var AdministradoresEsquema = Schema({
  user: String,
  pass: String,
});

//exportar el objeto "ArticuloEsquema" con el nombre de "Articulo"
module.exports = mongoose.model("Administradores", AdministradoresEsquema);
