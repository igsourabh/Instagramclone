const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

dotenv.config();

app.use(express.json());

app.use("/api/auth", require("./routes/signup"));
app.use("/api/auth", require("./routes/post"));
app.use("/api/auth", require("./routes/follow"));
app.use("/api/auth", require("./routes/updateuser"));
app.use("/api/auth", require("./routes/comment"));
app.use("/api/auth", require("./routes/forgot"));
// app.use("/api/auth", require("./routes/postuploader"));

// app.use("/images", express.static("images"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.listen(PORT, () => {
  console.log("app running on", PORT);
});
