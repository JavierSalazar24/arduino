"use stric";

var express = require("express");

//utilizar el archivo de controles dentro de rutas
var AdministradoresControlador = require("../controles/administradores");

//crear un objeto para generar rutas
var rutas = express.Router();

//crear las rutas reales para gestionar la coleccion de compras.
rutas.post("/buscarAdmin", AdministradoresControlador.busqueda); //buscar compras por ID

//exportar el objeto rutas para utilizarlo fuera de aquí
module.exports = rutas;
