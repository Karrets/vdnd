import express from "express";
import path from "node:path";

import clientRouter from "./clientRouter";
import apiRouter from "./apiRouter";
import {expressLog, consoleColors} from "./util";

const port = process.env.PORT || 8080;
const environment = process.env.ENV || "development";
const rootDir = process.env.ROOT_DIR;
const suppressSanity = process.env.SUPPRESS_SANITY;
const publicPath = path.join(rootDir || path.resolve(), "client", "public");
const distPath = path.join(rootDir || path.resolve(), "dist");

const app = express();
app.enable("trust proxy");
let server = app.listen(port, () => {
    expressLog(`Currently running in ${environment} mode`);

    if (environment === "production") { //Production warnings
        if (!suppressSanity)
            console.info(`${consoleColors.yellow}[ SECURITY WARN ]${consoleColors.reset} You're running in production mode, assuming a typical workflow, you should run this behind a reverse proxy to set-up https. If you have done this and this warning annoys you, you may suppress the error by setting the SUPPRESS_SANITY environment variable to 'true'.`);

        if (rootDir == null)
            console.error(`${consoleColors.red}[ SECURITY RISK ]${consoleColors.reset} You're running in production mode, but don't have a web root path set, use the ROOT_DIR environment variable to set it. In some cases having this variable unset may lead to undesired results.`);
    }

    expressLog(`Server live & listening @ http://localhost:${port}`);
});

if (environment === "production") {
    app.use("/", express.static(distPath));
} else {
    app.use("/", express.static(publicPath));

    app.use("/src", (req, res) => {
        expressLog(`redirecting asset '${req.path}' to localhost:5173/src${req.path}`);
        res.redirect(303, `http://localhost:5173/src${req.path}`);
    });
}

app.use(clientRouter());
app.use(apiRouter(server));