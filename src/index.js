const express = require("express");
const path = require("path");
const { engine } = require('express-handlebars');
const v1BurgerRoutes = require("./v1/routes/burgersRoutes");
const v1AuthRoutes = require("./v1/routes/authRoutes");

const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname, "./public");
const cors = require("cors");

const session = require('express-session');

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));


// Set up static files
app.use(express.static(publicPath));
// Middleware needed to parse JSON bodies of POST requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// API Rest routes
app.use("/api/v1", v1BurgerRoutes);
app.use("/api/v1", v1AuthRoutes);

// Set up handlebars
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    layoutsDir: path.join(__dirname, "views/layouts")
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


// Set up routes
app.get("/", (req, res) => {
    res.render("home", {
        session: req.session,
        title: "Burgers"
    });
});

app.get("/contacto", (req, res) => {
    res.render("contact", {
        session: req.session,
        title: "Contacto"
    });
});

app.get("/quienes-somos", (req, res) => {
    res.render("quienes-somos", {
        session: req.session,
        title: "Quienes somos"
    });
});

app.get("/ranking", (req, res) => {
    res.render("ranking", {
        session: req.session,
        title: "Ranking"
    });
});

app.get("/crear", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }
    res.render("crear", {
        session: req.session,
        title: "Crear"
    });

});

app.get("/register", (req, res) => {
    res.render("auth/register", {
        title: "Registro"
    });
});

app.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Entrar"
    });
});

app.get("/profile/:id", (req, res) => {
    const user_id = req.params.id;

    if (!req.session.user) {
        res.redirect("/login");
        return;
    }

    res.render("profile", {
        session: req.session,
        user: user_id,
        title: "Perfil"
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log('Error al cerrar sesión:', error);
        }
        res.redirect('/');
    });
});

app.get("/burger/:id", (req, res) => {
    const burger_id = req.params.id;

    res.render("burger", {
        session: req.session,
        burger: burger_id,
        title: "Burger"
    });
});

app.get("/burgers", (req, res) => {
    res.render("allBurgers", {
        session: req.session,
        title: "Burgers"
    });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
});