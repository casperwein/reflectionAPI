require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
console.log(port);
// console.log(process.env);
const userRouter = require("./router/user.js");
const reflectionsRouter = require("./router/reflections.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/reflections", reflectionsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    userRouter,
    reflectionsRouter,
    app,
};