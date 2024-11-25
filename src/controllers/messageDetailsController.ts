import type { Request, Response } from "express";
import { messages } from "./newMessageController";
export async function getMessageDetails(req: Request, res: Response) {
	const id = Number(req.query.id);
	const message = messages.find((m) => m.id === id);
	res.render("pages/messageDetails", { message });
}
