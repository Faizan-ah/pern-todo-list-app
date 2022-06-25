const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const { dbConnection } = require("./config/db");
const PORT = process.env.PORT || 9000;

dbConnection();

app.use(express.json());
app.use(cors());
// Serve static assets if in production
// app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
   // Set static folder
   app.use(express.static(path.join(__dirname, "client/build")));
   app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/todo", require("./routes/todolist"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, () => console.log("Listening to port", PORT));
