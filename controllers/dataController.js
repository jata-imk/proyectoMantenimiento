const Sensores = require("./../models/dataModel");

exports.createData = async (req, res) => {
    try {
        //Se obtiene y formatea la fecha y hora
        let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/");
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);

        let fecha = `${year}-${month}-${date}`;
        let hora = `${hour}:${minute}:${second}`;

        const newData = await Sensores.create( Object.assign({fecha: fecha}, {hora: hora}, req.body) );

        res.status(201).json({
            message: "Peticion POST procesada con exito",
            data: newData
        });
    } catch (err) {
        res.status(400).json({
            message: "Ocurrió un error al procesar la solicitud POST",
            err
        });
    }
};

exports.getData = async (req, res) => {
    try {
        const data = await Sensores.find();

        res.status(200).json({
            message: "Peticion GET procesada con exito",
            results: data.length,
            data
        });
    } catch(err) {
        res.status(404).json({
            message: "Ocurrió un error al procesar la solicitud GET",
            err
        });
    }
};

exports.getByDayData = async (req, res) => {
    try {
        const dayData = await Sensores.find({fecha: req.params.fecha});

        res.status(200).json({
            message: "Peticion GET procesada con exito",
            results: dayData.length,
            data: dayData
        });
    } catch(err) {
        res.status(404).json({
            message: "Ocurrió un error al procesar la solicitud GET",
            err
        });
    }
};

exports.getLastData = async (req, res) => {
    try {
        const qty = req.query.qty === undefined ? 1 : Number(req.query.qty);

        let lastData = await Sensores.find().sort({_id: -1}).limit(qty);
        lastData = lastData.reverse();

        res.status(200).json({
            message: "Peticion GET procesada con exito",
            results: lastData.length,
            data: lastData
        });
    } catch(err) {
        res.status(404).json({
            message: "Ocurrió un error al procesar la solicitud GET",
            err
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        await Sensores.deleteOne({_id: req.params.id});

        res.status(204).json({
            message: "Peticion DELETE procesada con exito",
            data: null
        });
    } catch (err) {
        res.status(404).json({
            message: "Ocurrió un error al procesar la solicitud DELETE",
            err
        });
    }
}

exports.deleteByDate = async (req, res) => {
    try {
        await Sensores.deleteMany({fecha: req.params.fecha});

        res.status(204).json({
            message: "Peticion DELETE procesada con exito",
            data: null
        });
    } catch (err) {
        res.status(404).json({
            message: "Ocurrió un error al procesar la solicitud DELETE",
            err
        });
    }
}