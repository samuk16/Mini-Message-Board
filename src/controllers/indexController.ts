import { getAllMessages } from "../db/queries";
import type { Request, Response } from "express";

async function getMessagesGet(req: Request, res: Response) {
	const messages = await getAllMessages();
	res.render("pages/index", { messages });
}

export { getMessagesGet };
