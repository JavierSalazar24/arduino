"use stric";

//cargar los modulos en Node para crear el servidor
var express = require("express"); //escuchar peticiones en HTTP
var bodyParser = require("body-parser"); //convertir todo a JSON

//ejecutar el express
var app = express();

//cargar el body-parser para utilizar posteriormente
app.use(bodyParser.urlencoded({ extended: false }));

//asegurar que el body-parser ppueda convertir cualquier cosa en JSON
app.use(bodyParser.json());

//cargar los archivo de rutas dentro de app
var articulo_rutas = require("./rutas/articulo");
var compras_rutas = require("./rutas/compras");
var administradores_rutas = require("./rutas/administradores");

// // CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//añadir las rutas reales
app.use("/api", articulo_rutas);
app.use("/api", compras_rutas);
app.use("/api", administradores_rutas);

//añadir rutas o métodos

// app.get("/prueba", (req, res) => {
//   return res.status(200).send({
//     materia: "Aplicaciones Web para I4.0",
//     carrera: "Tecnologías de la Información",
//     cuatrimestre: "Quinto",
//   });
// });

// app.get("/prueba_get", (req, res) => {
//   return res.status(200).send({
//     materia: "Aplicaciones Web para I4.0",
//     carrera: "Tecnologías de la Información",
//     cuatrimestre: "Quinto",
//     docente: "Javier Salazar",
//   });
// });

// app.post("/prueba_post", (req, res) => {
//   var mensaje = req.body.mensaje1;
//   return res.status(200).send({
//     materia: "Aplicaciones Web para I4.0",
//     area: "Desarrollo Multiplataforma",
//     url: "utd.edu.mx",
//     mensaje,
//   });
// });

//exportar el modulo app para su utilización
module.exports = app;
