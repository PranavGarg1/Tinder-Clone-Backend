const express = require("express");
const app = express();
const port = 3000;
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestConnectionRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestConnectionRouter);
app.use("/user", userRouter);

connectDb()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`app is listening on port 3000`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
