const express = require("express");
const v1BurgerRoutes = require("./v1/routes/burgersRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/burgers", v1BurgerRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
});