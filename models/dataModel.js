const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
    fecha: String,
    hora: {
        type: String,
        unique: true
    },
    temperaturaLlenado: {
        type: Number,
        required: [true, "Campo 'temperaturaLlenado' es obligatorio"]
    },
    corrienteLlenado: {
        type: Number,
        required: [true, "Campo 'corrienteLlenado' es obligatorio"]
    },
    vibracionLlenado: {
        type: Boolean,
        required: [true, "Campo 'vibracionLlenado' es obligatorio"]
    },
    distanciaLlenado: {
        type: Number,
        required: [true, "Campo 'distanciaLlenado' es obligatorio"]
    },
    temperaturaAgitador: {
        type: Number,
        required: [true, "Campo 'temperaturaAgitador' es obligatorio"]
    },
    corrienteAgitador: {
        type: Number,
        required: [true, "Campo 'corrienteAgitador' es obligatorio"]
    },
    vibracionAgitador: {
        type: Boolean,
        required: [true, "Campo 'vibracionAgitador' es obligatorio"]
    }
});

const Sensores = mongoose.model("Sensores", sensorDataSchema);

module.exports = Sensores;