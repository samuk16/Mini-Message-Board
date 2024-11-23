const express = require("express");
const path = require("node:path");
import type { Request, Response, NextFunction } from "express";
const app = express();

type Message = {
	id: number;
	text: string;
	user: string;
	added: Date;
};

const messages: Message[] = [
	{
		id: 1,
		text: "Hi there!",
		user: "Amando",
		added: new Date(),
	},
	{
		id: 2,
		text: "Hello World!",
		user: "Charles",
		added: new Date(),
	},
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.render("pages/index", { messages: messages });
});
app.get("/new", (req: Request, res: Response) => {
	res.render("pages/form");
});

app.post("/new", (req: Request, res: Response) => {
	messages.push({
		id: messages.length + 1,
		text: req.body.text,
		user: req.body.authorName,
		added: new Date(),
	});
	res.redirect("/");
});

app.get("/message", (req: Request, res: Response) => {
	const id = Number(req.query.id);
	const message = messages.find((m) => m.id === id);
	res.render("pages/messageDetails", { message });
});

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
