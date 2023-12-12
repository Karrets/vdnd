import express from "express";
import path from "node:path";
import fs from "fs/promises";

import {expressLog} from "../util.js";

const environment = process.env.NODE_ENV || 'development';
const rootDir = process.env.ROOT_DIR || '';
const manifestPath = path.join(rootDir || path.resolve('./dist'), "client", ".vite", "manifest.json");
let lazyManifest =  {_comment: "manifest was never reassigned, this should never occur", _invalid: true};


export default function clientRouter() {
    const router = express.Router();

    router.get("/*", async (req, res) => {
        expressLog(`serving page @ root${req.path}`);

        if(lazyManifest._invalid)
            lazyManifest = await parseManifest();

        res.render(
            "index.html.ejs",
            {
                cache: true,
                environment,
                manifest: lazyManifest
            },
            (err, html) => {
                if (err) {
                    expressLog(`errored with manifest: ${JSON.stringify(lazyManifest)}`);
                    expressLog(`express gave the following information: ${JSON.stringify(err)}`);
                    res.status(500).send()
                } else {
                    res.send(html);
                }
            });
    });

    return router;
}

async function parseManifest() {
    expressLog('Fetching manifest for first time... Fingers crossed!');

    if (environment !== "production") {
        expressLog("Running in development, so no manifest exists!");
        return {
            _comment: "Running in development, so no manifest exists!",
            _invalid: true
        };
    }

    expressLog("Fetching manifest at path", manifestPath);

    return fs.readFile(manifestPath, 'utf8')
        .catch(err => {
            expressLog(`fs read gave an error, here's what we know: ${JSON.stringify(err)}`);
            return `
            {
                "_comment": "fs read gave an error, here's what we know: ${JSON.stringify(err)},
                "_invalid": true
            }`;
        })
        .then(data => JSON.parse(data));
}
