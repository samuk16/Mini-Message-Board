import express from "express";
import path from "node:path";
import dotenv from "dotenv";
import newMessageRouter from "./routes/new";
import messageDetailsRouter from "./routes/messageDetails";
import type { Request, Response, NextFunction } from "express";
import indexRouter from "./routes";
dotenv.config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", indexRouter);
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log("Example app listening on port 3000!");
});
