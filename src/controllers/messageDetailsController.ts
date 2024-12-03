import type { Request, Response } from "express";
import { getMessage } from "../db/queries";
export async function getMessageDetails(req: Request, res: Response) {
	const id = Number(req.query.id);
	const message = await getMessage(id);
	res.render("pages/messageDetails", { message: message[0] });
}
