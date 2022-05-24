"use stric";

var Administradores = require("../modelos/administradores");

//Crear un objeto que se llame validación para validar los datos que se ingresan a la colección Compras
// var validacion = require("validator");
// const { version } = require("mongoose");

//Crear el objeto controlador con el cual se pueda hacer la gestion de la coleccion compras
var controlador = {
  //rutas y métodos de prueba
  //consultar un documento (registro) en particular
  busqueda: (req, res) => {
    //recoger parametros por medio del metodo post
    var params = req.body;

    //crear el objeto para guardar los valores de compras
    var admin = new Administradores();

    //asignar valores
    admin.usuario = params.user;
    admin.password = params.pass;

    Administradores.find({
      $and: [{ usuario: params.user }, { password: params.pass }],
    }).exec((err, administradores) => {
      if (err) {
        return res.status(500).send({
          // ERROR
          status: "error",
          mensaje: "No se puede realizar la consulta",
        });
      }

      if (!administradores) {
        return res.status(404).send({
          // ERROR:
          status: "error",
          mensaje: "Error al buscar al usuario",
        });
      }

      // if (administradores) {
      var adminLenght = administradores.length;
      if (adminLenght == 0) {
        return res.status(200).send({
          // ERROR:
          status: "error",
          mensaje: "Error al buscar al usuario, ningún usuario coincide",
          adminLenght,
        });
      } else {
        return res.status(200).send({
          // Consulta Exitosa
          status: "exitosa",
          administradores,
          adminLenght,
        });
      }
    });
  },
};

//Exportar mi objeto "controlador" para utilizarlo fuera de aquí
module.exports = controlador;
