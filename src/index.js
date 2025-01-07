const express = require("express");
const config = require("../config");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize");
const sessionStore = SequelizeStore(session.Store);
const db = require("../config/auth_database_config");
require("dotenv").config();

const app = express();
const port = config.port;

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000"], // Mengizinkan semua origin, bisa disesuaikan untuk produksi
  credentials: true, // Memungkinkan kredensial (cookies)
  preflightContinue: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Metode yang diizinkan
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "connect.sid",
    "Cookie", // Jika menggunakan JWT atau header otorisasi lainnya
  ],
};

// Gunakan SequelizeStore untuk session
const store = new sessionStore({
  db: db.sequelizeConnection,
});

// Middleware untuk menangani CORS
app.use(cors(corsOptions));

// Middleware untuk menangani cookies
app.use(cookieParser());

// Middleware untuk session
app.use(
  session({
    secret: config.sessionSecret, // Kunci rahasia untuk session
    resave: false, // Jangan simpan session meskipun tidak ada perubahan
    saveUninitialized: false, // Simpan session meskipun belum ada data
    store: store, // Gunakan store Sequelize untuk session
    cookie: {
      secure: false, // Setel ke `true` jika menggunakan HTTPS
      sameSite: "none", // Agar cookie bisa dikirim lintas domain
      httpOnly: true, // Agar cookie hanya bisa diakses oleh server (bukan JavaScript)
      path: "/", // Cookie berlaku di seluruh aplikasi
      maxAge: 3600000, // Durasi hidup session (1 jam)
    },
  })
);

// Middleware untuk memparsing body JSON
app.use(express.json());

// Definisikan route
const userRoutes = require("./user/routes/user_routes");
const authRoutes = require("./auth/routes/auth_routes");
const deviceRoutes = require("./device/routes/device_routes");
const apiKeyRoutes = require("./api-key/routes/api-key_routes");
const dashboardRoutes = require("./dashboard/routes/dashboard_routes");
const projectRoutes = require("./project/routes/project_routes");
const tenantRoutes = require("./tenant/routes/tenant_routes");
const typeRoutes = require("./type/routes/routes_type");

// Gunakan route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/device", deviceRoutes);
app.use("/api/v1/api-key", apiKeyRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/tenant", tenantRoutes);
app.use("/api/v1/type", typeRoutes);

// Mulai server
app.listen(port, "0.0.0.0", () => {
  console.log(`Service Backend Middleware Running on ${process.env.NODE_ENV} Environment`);
});
