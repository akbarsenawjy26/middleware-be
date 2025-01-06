const express = require("express");
const config = require("../config");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize");
const db = require("../config/auth_database_config");
require("dotenv").config();
const app = express();
const port = config.port;
const sessionStore = SequelizeStore(session.Store);
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(helmet());
const store = new sessionStore({
  db: db,
});

const userRoutes = require("./user/routes/user_routes");
const authRoutes = require("./auth/routes/auth_routes");
const deviceRoutes = require("./device/routes/device_routes");
const apiKeyRoutes = require("./api-key/routes/api-key_routes");
const dashboardRoutes = require("./dashboard/routes/dashboard_routes");
const projectRoutes = require("./project/routes/project_routes");
const tenantRoutes = require("./tenant/routes/tenant_routes");
const typeRoutes = require("./type/routes/routes_type");

app.use(
  session({
    secret: config.sessionSecrete,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: true,
    AllowOrigin: ["*"],
  })
);

app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/device", deviceRoutes);
app.use("/api/v1/api-key", apiKeyRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/tenant", tenantRoutes);
app.use("/api/v1/type", typeRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Middleware App Running on ${process.env.NODE_ENV} Environment`);
});
