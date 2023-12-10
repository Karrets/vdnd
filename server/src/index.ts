import express from "express";
import path from "node:path";

import clientRouter from "./clientRouter";
import apiRouter from "./apiRouter";

const port = process.env.PORT || 8080;
const publicPath = path.join(path.resolve(), "client/public/");
const distPath = path.join(path.resolve(), "dist");

const app = express();

app.listen(port, () => {
    console.log(`Server live & listening @ http://localhost:${port}`);
});

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(distPath));
} else {
    app.use("/", express.static(publicPath));
    app.use("/src/*", (req, res) => {
        res.redirect(303, `http://localhost:5173/${req.path}`);
    })
}

app.use(apiRouter);
app.use(clientRouter);