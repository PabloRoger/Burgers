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

/**
 * the session middleware creates a session object in the request object.
 * this object is used to store information about the user.
 *
 * express-session uses a cookie to store the session id in the client.
 * the cookie is sent to the server in every request.
 */
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));


// Set up static files
app.use(express.static(publicPath));
// Middleware needed to parse JSON bodies of POST requests
app.use(express.urlencoded({ extended: false }));
// Middleware needed to parse JSON bodies of POST requests
app.use(express.json());
// Middleware needed to enable CORS
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

// Set up views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


// Set up routes
app.get("/", (req, res) => {
    // render the home view and pass the session object and title to the view
    res.render("home", {
        session: req.session,
        title: "Burgers"
    });
});

app.get("/contacto", (req, res) => {
    // render the contact view and pass the session object and title to the view
    res.render("contact", {
        session: req.session,
        title: "Contacto"
    });
});

app.get("/quienes-somos", (req, res) => {
    // render the quienes-somos view and pass the session object and title to the view
    res.render("quienes-somos", {
        session: req.session,
        title: "Quienes somos"
    });
});

app.get("/ranking", (req, res) => {
    // render the ranking view and pass the session object and title to the view
    res.render("ranking", {
        session: req.session,
        title: "Ranking"
    });
});

app.get("/crear", (req, res) => {
    // if the user is not logged in, redirect to login page
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }

    // render the crear view and pass the session object and title to the view
    res.render("crear", {
        session: req.session,
        title: "Crear"
    });

});

app.get("/register", (req, res) => {
    // if the user is logged in, redirect to home page
    if (req.session.user) {
        res.redirect("/");
        return;
    }

    // render the register view and pass title to the view
    res.render("auth/register", {
        title: "Registro"
    });
});

app.get("/login", (req, res) => {
    // if the user is logged in, redirect to home page
    if (req.session.user) {
        res.redirect("/");
        return;
    }

    // render the login view and pass title to the view
    res.render("auth/login", {
        title: "Entrar"
    });
});

app.get("/profile/:id", (req, res) => {
    // get the user id from the url
    const user_id = req.params.id;

    // if the user is not logged in, redirect to login page
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }

    // if the user is logged in but is not the same as the one in the url, redirect to home page
    res.render("profile", {
        session: req.session,
        user: user_id,
        title: "Perfil"
    });
});

app.get('/logout', (req, res) => {
    // if the user is not logged in, redirect to login page
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }

    // destroy the session
    req.session.destroy((error) => {
        if (error) {
            console.log('Error al cerrar sesión:', error);
        }
        res.redirect('/');
    });
});

app.get("/burger/:id", (req, res) => {
    // get the burger id from the url
    const burger_id = req.params.id;

    // render the burger view and pass the session object, burger id and title to the view
    res.render("burger", {
        session: req.session,
        burger: burger_id,
        title: "Burger"
    });
});

app.get("/burgers", (req, res) => {
    // render the allBurgers view and pass the session object and title to the view
    res.render("allBurgers", {
        session: req.session,
        title: "Burgers"
    });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
});