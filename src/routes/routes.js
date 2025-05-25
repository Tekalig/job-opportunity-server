const express = require("express");
const verifyToken = require("../middleware/auth-middleware");
const { expertRouter } = require("./expert-route");
const { employerRouter } = require("./employer-route");

const apiRouter = express.Router();

apiRouter.use("/expert", verifyToken, expertRouter);
apiRouter.use("/employer", verifyToken, employerRouter);
apiRouter.get("/logout", (req, res) => {
  res.clearCookie("token").send("Logged out successfully");
});

module.exports = apiRouter;
