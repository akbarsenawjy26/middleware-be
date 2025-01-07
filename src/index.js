const express = require("express");
const config = require("../config");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize");
const sessionStore = SequelizeStore(session.Store);
const db = require("../config/auth_database_config");
require("dotenv").config();
const fs = require("fs");
const https = require("https");

const app = express();
const port = config.port;

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  preflightContinue: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization", "connect.sid", "Cookie"],
};

const store = new sessionStore({
  db: db.sequelizeConnection,
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
      maxAge: 3600000,
    },
  })
);

app.use(express.json());

const userRoutes = require("./user/routes/user_routes");
const authRoutes = require("./auth/routes/auth_routes");
const deviceRoutes = require("./device/routes/device_routes");
const apiKeyRoutes = require("./api-key/routes/api-key_routes");
const dashboardRoutes = require("./dashboard/routes/dashboard_routes");
const projectRoutes = require("./project/routes/project_routes");
const tenantRoutes = require("./tenant/routes/tenant_routes");
const typeRoutes = require("./type/routes/routes_type");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/device", deviceRoutes);
app.use("/api/v1/api-key", apiKeyRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/tenant", tenantRoutes);
app.use("/api/v1/type", typeRoutes);

// Set up HTTPS
const privateKey = fs.readFileSync("/etc/letsencrypt/live/103.52.115.128.nip.io/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/103.52.115.128.nip.io/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/103.52.115.128.nip.io/chain.pem", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create HTTPS server
https.createServer(credentials, app).listen(port, "0.0.0.0", () => {
  console.log(`Service Backend Middleware Running on ${process.env.NODE_ENV} Environment`);
});
