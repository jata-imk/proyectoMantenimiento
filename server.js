const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");


const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( con => {
    console.log("Conexión con la base de datos exitosa!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}...`);
});