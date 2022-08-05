const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const helmet = require("helmet");
const xssClean = require("xss-clean");
const hpp = require("hpp");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const taskRoute = require("./routes/Tasks");

const { authentication } = require('./middlewares/basicAuth');

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// parse cookies
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Generate a unique session id, store session id in a session cookie, create empty session object
app.use(
  session({
    key: "username",
    secret: "thisisasecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, // expires in 24hrs
    },
  })
);

// Setup security headers
app.use(helmet());

// Prevent xss attacks
app.use(xssClean());

// Prevent HTTP Parameter Pollution attacks
app.use(hpp());

// Routes
app.use("/api/v1/:username/:password", authentication, taskRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});