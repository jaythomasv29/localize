const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors")

const PORT = 8000;
const locationsRouter = require("./routes/locations.js");
const authRouter = require("./routes/auth");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    throw err;
  }
}

app.get("/", (req, res) => {
  res.json("connected");
});

app.use("/api/location", locationsRouter);

app.use("/api/auth", authRouter);

// Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
});

// Use of static folder
app.use(express.static(path.join(__dirname, "/client/build")))

// Display index.html file on any request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running... Listening on port ${PORT}`);
  connectToDb();
});
