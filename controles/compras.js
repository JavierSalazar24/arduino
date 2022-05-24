"use stric";

var Compras = require("../modelos/compras");

//Crear un objeto que se llame validación para validar los datos que se ingresan a la colección Compras
var validacion = require("validator");

//Crear el objeto controlador con el cual se pueda hacer la gestion de la coleccion compras
var controlador = {
  //rutas y métodos de prueba

  //metodos para gestionar (insertar, buscar, actualizar y eliminar) la BD de "api_resta" especificamente la colección de "compras"
  insertar: (req, res) => {
    //recoger parametros por medio del metodo post
    var params = req.body;

    //crear el objeto para guardar los valores de compras
    var compras = new Compras();

    //asignar valores
    compras.id_articulo = params.id_articulo;
    compras.cantidad = params.cantidad;
    compras.monto = params.monto;

    //validar que la información este completa
    try {
      var validar_id = !validacion.isEmpty(params.id_articulo);
      var validar_cantidad = !validacion.isEmpty(params.cantidad);
      var validar_monto = !validacion.isEmpty(params.monto);
    } catch (error) {
      return res.status(404).send({
        //Error al insertar el registro
        status: "Error",
        mensaje: "Faltan datos por envíar",
      });
    }

    if (validar_cantidad && validar_monto && validar_id) {
      //Datos correctos y completos, puede guardar el documento
      //Guardar las compras en la BD de Mongo
      compras.save((err, compraGuardada) => {
        if (err || !compraGuardada) {
          return res.status(404).send({
            //Error al insertar el registro
            status: "Error",
            mensaje: "La compra no se ha guaradado",
          });
        }
        //devolver una respuesta
        return res.status(200).send({
          //registro insertado con exito
          status: "exitosa",
          compraGuardada,
        });
      });
    } else {
      return res.status(404).send({
        //Error al insertar el registro
        status: "Error",
        mensaje: "Los datos no son validos, verifiquelos por favor.",
      });
    }
  },

  //consultar las ultimas 5 compras que se ingresaron a la BD
  buscar: (req, res) => {
    var ultimo = req.params.last;
    var consulta = Compras.find({});

    if (ultimo || ultimo != undefined) {
      consulta.limit(5);
    }

    //Ejecutar la consulta a la BD de Mongo para mostrar los registros en JSON
    consulta.sort("-_id").exec((err, compras) => {
      if (err) {
        return res.status(500).send({
          //Error
          status: "Error",
          mensaje: "Error al ejecutar la consulta",
        });
      }
      if (!compras) {
        return res.status(404).send({
          //Error
          status: "Error",
          mensaje: "No existen compras en la BD que mostrar",
        });
      }
      //Consulta ejecutada con exito
      return res.status(200).send({
        //registro insertado con exito
        status: "exitosa",
        compras,
      });
    });
  },

  //consultar un documento (registro) en particular
  busqueda: (req, res) => {
    //recoger el parametro necesario
    var comprasid = req.params.id;

    //verificar que reciba parametros en la consulta
    if (!comprasid || comprasid == null) {
      return res.status(404).send({
        //ERROR: No ha ingresado un id a buscar
        status: "ERROR:",
        mensaje: "No ha ingresado un id a buscar",
      });
    }

    //buscar la compra en la colección
    Compras.findById(comprasid, (err, compras) => {
      if (err || !compras) {
        return res.status(404).send({
          //ERROR: registro NO encontrado
          status: "ERROR:",
          mensaje: "registro NO encontrado",
        });
      }

      return res.status(200).send({
        //registro encontrado con exito
        status: "exitosa",
        compras,
      });
    });
  },

  //consultar los documentos que coincidad con un parametro de busqueda
  consulta: (req, res) => {
    //obtener la numero a buscar
    var cadena = req.params.cadena;
    var numero = parseInt(cadena);

    //Buscar la coincidencia de la cadena
    //Si el valor de la "numero" esta incluido (i) dentro del "monto", entonces va a sacar las compras que coincidad
    //Ó si el valor de la "numero" esta incluido (i) dentro de la "cantidad", entonces va a sacar las compras que coincidad
    Compras.find({
      $or: [
        { id_articulo: { $regex: cadena, $options: "i" } },
        { $where: `/${numero}/i.test(this.cantidad)` },
        { $where: `/${numero}/i.test(this.monto)` },
      ],
    })
      .sort("-date")
      .exec((err, compras) => {
        if (err) {
          return res.status(500).send({
            // ERROR
            status: "error",
            mensaje: "No se puede realizar la consulta",
          });
        }

        if (!compras) {
          return res.status(404).send({
            // ERROR:
            status: "error",
            mensaje:
              "No existen compras que coincidan con el parametro de busqueda",
          });
        }

        return res.status(200).send({
          // Consulta Exitosa
          status: "exitosa",
          compras,
        });
      });
  },

  actualizar: (req, res) => {
    //recojer el parametro necesario
    var compraid = req.params.id;

    //recojer los parametros que llegan por put
    var params = req.body;

    //validar que la informacion este completa
    // try {
    //   var validar_id_articulo = !validacion.isEmpty(params.id_articulo);
    //   var validar_cantidad = !validacion.isEmpty(params.cantidad);
    //   var validar_monto = !validacion.isEmpty(params.monto);
    // } catch (err) {
    //   return res.status(404).send({
    //     //Error
    //     status: "error",
    //     mensaje: "Faltan datos por enviar",
    //   });
    // }

    // if (validar_id_articulo && validar_cantidad && validar_monto) {
    //colocar el metodo de busqueda y actualizacion
    Compras.findOneAndUpdate(
      { _id: compraid },
      params,
      { new: true },
      (err, compraActualizada) => {
        if (err) {
          return res.status(404).send({
            //Error
            status: "error: ",
            mensaje: "No es posible actualizar el registro",
          });
        }

        if (!compraActualizada) {
          return res.status(404).send({
            //Error
            status: "error: ",
            mensaje: "No existe el registro a modificar",
          });
        }

        return res.status(200).send({
          //resgistro actualizado con exito
          status: "exitosa",
          compraActualizada,
        });
      }
    );
    // } else {
    //   return res.status(404).send({
    //     //Error
    //     status: "error",
    //     mensaje: "Los datos no son vaidos por favor verifique",
    //   });
    // }
  },

  eliminar: (req, res) => {
    var compraid = req.params.id; //recoger el parametro necesario

    //validar que se haya ingresado un id
    if (!compraid || compraid == null) {
      return res.status(404).send({
        //ERROR: No ha ingresado un id a buscar
        status: "ERROR:",
        mensaje: "No ha ingresado un id a buscar",
      });
    }

    //eliminar el registro
    Compras.findOneAndDelete({ _id: compraid }, (err, compraEliminada) => {
      if (err) {
        return res.status(500).send({
          //ERROR: al intentar eliminar la compra
          status: "ERROR:",
          mensaje: "Error al intentar eliminar la compra",
        });
      }

      if (!compraEliminada) {
        return res.status(404).send({
          //ERROR: No se encontró la compra con el ID a buscar, por lo tanto no se puede eliminar
          status: "ERROR:",
          mensaje:
            "No se encontró la compra con el ID a buscar, por lo tanto no se puede eliminar",
        });
      }

      return res.status(200).send({
        //Registro o ducumento eliminado
        status: "exitosa",
        compraEliminada,
      });
    });
  },
};

//Exportar mi objeto "controlador" para utilizarlo fuera de aquí
module.exports = controlador;
