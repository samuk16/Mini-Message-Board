const express = require("express");
const path = require("node:path");
import newMessageRouter from "./routes/new";
import messageDetailsRouter from "./routes/messageDetails";
import type { Request, Response, NextFunction } from "express";
const app = express();
import { messages } from "./controllers/newMessageController";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.render("pages/index", { messages: messages });
});

app.use("/new", newMessageRouter);
app.use("/message", messageDetailsRouter);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
	const error = new Error("Page not found!");
	next(error);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).render("pages/404");
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
