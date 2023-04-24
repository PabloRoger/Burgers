const express = require("express");
const router = express.Router();

router
    .get("/", (req, res) => {
        res.send("Get all the burgers");
    })
    .get("/:id", (req, res) => {
        res.send(`Get a burger with id: ${req.params.id}`);
    })
    .post("/:id", (req, res) => {
        res.send(`Create a new burger with id: ${req.params.id}`);
    })
    .put("/:id", (req, res) => {
        res.send(`Update a burger with id: ${req.params.id}`);
    })
    .delete("/:id", (req, res) => {
        res.send(`Delete a burger with id: ${req.params.id}`);
    });

module.exports = router;