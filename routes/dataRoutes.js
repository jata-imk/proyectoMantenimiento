const express = require("express");
const dataController = require("./../controllers/dataController");

const router = express.Router();

router
    .route("/")
    .get(dataController.getData)
    .post(dataController.createData);

router
    .route("/last")
    .get(dataController.getLastData)

router
    .route("/date/:fecha")
    .get(dataController.getByDayData)
    .delete(dataController.deleteByDate);

router
    .route("/id/:id")
    .delete(dataController.deleteById);

module.exports = router;
