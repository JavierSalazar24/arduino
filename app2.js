// /* ------------------------- ESTATUS DE LA ALARMA CON MONGODB Y JS --------------------------------- */
// // Express
// const express = require("express");
// const app = express();

// // Comunicación serial
// const Serialport = require("serialport");
// const ReadLine = Serialport.parsers.Readline;

// const port = new Serialport("COM3", {
//   baudRate: 9600,
// });

// const parser = port.pipe(new ReadLine({ delimiter: "\n" }));

// parser.on("open", function () {
//   console.log("Arduino Conectado");
// });

// parser.on("data", function (data) {
//   let valor = data.split("");
//   let correos = [""];
//   let limit = valor.length;
//   let j = 2;
//   for (let i = 0; i < limit - 3; i++) {
//     correos[0] = correos[0] + valor[j];
//     j++;
//   }
//   console.log(data[0]);
//   const { MongoClient } = require("mongodb");
//   const uri =
//     "mongodb+srv://javier:javier12345@cluster0.w3wdi.mongodb.net/opss?retryWrites=true&w=majority";
//   connect();
//   async function connect() {
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//     const db = client.db("opss");
//     // console.log("conectado a la BD", db.databaseName);
//     const pruebas = db.collection("clientes");

//     if (valor[0] == 1) {
//       let id = valor[1];
//       let correo = correos[0];
//       // console.log(correo.toString());

//       //actualización
//       await pruebas.updateOne(
//         { correo: correo },
//         { $set: { [`alarmas.alarma ${id}`]: "encendida" } }
//       );
//       // console.log(actualizar.modifiedCount);
//       client.close();
//     } else {
//       let id = valor[1];
//       let correo = correos[0];
//       // console.log(correo.toString());

//       //actualización
//       await pruebas.updateOne(
//         { correo: correo },
//         { $set: { [`alarmas.alarma ${id}`]: "apagada" } }
//       );
//       // console.log(actualizar.modifiedCount);
//       client.close();
//     }
//   }
// });

// // exportar el modulo app para su utilización
// module.exports = app;
