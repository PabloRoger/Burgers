const express = require("express");
const path = require("path");
const v1BurgerRoutes = require("./v1/routes/burgersRoutes");

const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname, "./public");

// Set up static files
app.use(express.static(publicPath));
// Middleware needed to parse JSON bodies of POST requests
app.use(express.json());
// API Rest routes
app.use("/api/v1", v1BurgerRoutes);

// Set up handlebars
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

// Set up routes
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
});