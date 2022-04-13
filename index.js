const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRouter = require("./router/user.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});