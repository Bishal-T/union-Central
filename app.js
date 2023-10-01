// require modules
const express = require("express");
const morgan = require("morgan");
const eventsRoutes = require("./routes/eventsRoutes");
const methodOverride = require("method-override");
const mainRoutes = require("./routes/mainRoutes")


// create app
const app = express();

// configure app
let port = 8080;
let host = "localhost";
app.set("view engine", "ejs");

// mount middleware
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

//set up routes
app.get("/", (req, res) => {
  res.render("./main/index");
});

app.use("/", mainRoutes)

app.use("/events", eventsRoutes);





// app.use((req, res, next) => {
//     let err = new Error('The server cannot locate: ' + req.url)
//     err.status = 404
//     next(err)
// })

// app.use((err, req, res, next)=> {
// if(!err.status) {
//     err.status = 500;
//     err.message = ("Internal Server Error")
// }

// res.status(err.status);
// res.render('error', {error: err})


// })

//start the server
app.listen(port, host, () => {
  console.log("server is running on", port);
});
