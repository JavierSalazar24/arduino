"use stric";

//cargar el modulo de mongoose para conectar con la BD de mongodb
var mongoose = require("mongoose");

//cargar el modulo app.js dentro del index.js
var app = require("./app");
var port = 3900;

//configuraciones adicionales para que sirva correctamente Mongoose
mongoose.Promise = global.Promise;

//descativar metodos viejos del mongoose
mongoose.set("useFindAndModify", false);

//conectar el MongoDb con el Node JS
mongoose
  .connect("mongodb://localhost:27017/api_resta", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //conectar con MongoDB y Node JS
    console.log("Conexión exitosa con MongoDB");

    //hacer que el servidor web escuche peticiones HTTP
    app.listen(port, () => {
      console.log(
        "Servidor corriendo y listo para escuchar peticiones en: http://localhost:" +
          port
      );
    });
  });
