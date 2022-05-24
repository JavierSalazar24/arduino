"use stric";

var express = require("express");

//utilizar el archivo de controles dentro de rutas
var ComprasControlador = require("../controles/compras");

//crear un objeto para generar rutas
var rutas = express.Router();

//crear las rutas reales para gestionar la coleccion de compras.
rutas.post("/insertarCompra", ComprasControlador.insertar); //insertar compras
rutas.get("/buscarCompras/:last?", ComprasControlador.buscar); //buscar las últimos 5 compras
rutas.get("/buscarCompra/:id?", ComprasControlador.busqueda); //buscar compras por ID
rutas.get("/consultaCompras/:cadena?", ComprasControlador.consulta); //consular los articulos que coincidan con la cadena de busqueda
rutas.put("/actualizarCompra/:id?", ComprasControlador.actualizar); //buscar y actualizar compras por ID
rutas.delete("/eliminarCompra/:id?", ComprasControlador.eliminar); //eliminar una compra por ID

//exportar el objeto rutas para utilizarlo fuera de aquí
module.exports = rutas;
