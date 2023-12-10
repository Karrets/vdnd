import express from "express";

const clientRouter = express.Router();

clientRouter.get("/api/v1/hello", (_req, res) => {
    res.json({ message: "Hello, world!" });
});

export default clientRouter;