import express from "express";
import path from "node:path";
import fs from "fs/promises";

import {expressLog} from "./util";
import {send} from "vite";

const environment = process.env.ENV || '';
const rootDir = process.env.ROOT_DIR;
const manifestPath = path.join(rootDir || path.resolve(), "dist", ".vite", "manifest.json");
let lazyManifest = null;


export default function clientRouter() {
    const router = express.Router();

    router.get("/*", async (req, res) => {
        expressLog(`serving page @ root${req.path}`);

        res.render(
            "index.html.ejs",
            {
                cache: true,
                environment,
                manifest: lazyManifest ??= parseManifest()
            },
            (err, html) => {
                if(err) console.error(err);
                res.send(err || html)
            });
    });

    return router;
}

async function parseManifest() {
    expressLog('Fetching manifest for first time... Fingers crossed!');

    if (environment !== "production") return {};

    return fs.readFile(manifestPath, 'utf8')
        .catch(err => {
            console.error(err);
            return '{}';
        })
        .then(data => JSON.parse(data));
}
