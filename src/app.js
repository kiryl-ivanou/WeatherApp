const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { read } = require("fs");
const app = express();
const port = 3080;

//Geocoding
const geocode = require("./utils/geocode");
const weatherData = require("./utils/weatherData");

// define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather Page",
        name: "Kiryl",
        iconName: "volcano-icon",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Kiryl",
        iconName: "about-icon",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Kiryl",
        iconName: "help-icon",
        helpMsg:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, tenetur minima, vel voluptate alias soluta cupiditate praesentium ipsam ea, amet dolorem! Dignissimos sed nulla deserunt incidunt, sequi labore dolorem. Ex, facilis voluptatibus! Exercitationem error id dicta qui aliquam quo dolor distinctio nostrum laudantium consequuntur dolore quae accusantium similique saepe blanditiis inventore, sit tempore culpa. Culpa omnis beatae rem laudantium, eligendi commodi porro doloremque voluptate voluptatum aliquid perspiciatis minima itaque aut, perferendis magni velit, quo illum. Molestiae illo sapiente dolorum, porro ex animi fugit unde commodi explicabo quod debitis ea doloremque quam voluptates! Facere cumque sit quae perspiciatis atque? Ducimus, velit.",
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide Location",
        });
    }
    geocode.getGeoCode(
        address,
        ({ longitude, latitude, location, error = null }) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            weatherData.getCurrentWeatherData(
                `${latitude},${longitude}`,
                ({
                    temperature,
                    feelslike,
                    weather_descriptions,
                    error = null,
                }) => {
                    if (error) {
                        return res.send({
                            error,
                        });
                    }

                    return res.send({
                        location,
                        feelslike,
                        temperature,
                        forecast: weather_descriptions[0],
                    });
                }
            );
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("notFound", {
        title: "Not Found Page",
        name: "Kiryl",
        notFoundMsg: "Help article not found :(",
    });
});

app.get("*", (req, res) => {
    res.render("notFound", {
        title: "Not Found Page",
        name: "Kiryl",
        notFoundMsg: "Page not found :(",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
