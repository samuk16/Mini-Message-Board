import type { Request, Response } from "express";
type Message = {
	id: number;
	text: string;
	user: string;
	added: Date;
};

export const messages: Message[] = [
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
export async function getTemplateForm(req: Request, res: Response) {
	res.render("pages/form");
}
export async function postNewMessage(req: Request, res: Response) {
	messages.push({
		id: messages.length + 1,
		text: req.body.text,
		user: req.body.authorName,
		added: new Date(),
	});
	res.redirect("/");
}
