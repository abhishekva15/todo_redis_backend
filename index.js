// const express = require("express");
// const dbConnect = require("./config/database");
// const auth = require("./router/auth");
// const todoRouter = require("./router/todo");
// require("dotenv").config();

// const cors = require("cors");

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,PUT,POST,DELETE",
//   credentials: true,
// };
// app.use(cors(corsOptions));

// dbConnect();
// app.use(express.json());
// app.use("/api/v1", auth);
// app.use("/api/v1", todoRouter);

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`Server is run port ${PORT}`);
// });


const express = require("express");
const dbConnect = require("./config/database");
const auth = require("./router/auth");
const todoRouter = require("./router/todo");
require("dotenv").config();
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", auth);
app.use("/api/v1", todoRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
