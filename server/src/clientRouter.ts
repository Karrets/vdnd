import express from "express";
import path from "node:path";
import fs from "fs/promises";

const environment = process.env.NODE_ENV || '';
const clientRouter = express.Router();

clientRouter.get('/src/*', (req, res) => {
    res.redirect(303, `http://localhost:5173/${req.path}`);
});

clientRouter.get("/*", async (_req, res) => {
    const data = {
        environment,
        manifest: await parseManifest(),
    };

    res.render("index.html.ejs", data);
});

const parseManifest = async () => {
    if (environment !== "production") return {};
    const manifestPath = path.join(path.resolve(), "client", "dist", ".vite", "manifest.json");

    return fs.readFile(manifestPath, 'utf8')
        .catch(reason => console.error(reason))
        .then(data => JSON.parse(data || '{}'));
};

export default clientRouter;
