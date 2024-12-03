import type { Request, Response } from "express";
import { createMessage } from "../db/queries";

import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters";
const lenghtErr = "must be between 2 and 25 characters";

const validateMessage = [
	body("authorName")
		.trim()
		.isAlpha()
		.withMessage(`Author name ${alphaErr}`)
		.isLength({ min: 2, max: 25 })
		.withMessage(`Author name ${lenghtErr}`),
	body("text")
		.trim()
		.isString()
		.withMessage("Message must be a string")
		.isLength({ min: 1, max: 255 })
		.withMessage("Message must be between 1 and 255 characters"),
];
export async function getTemplateForm(req: Request, res: Response) {
	res.render("pages/form");
}

export const newMessagePost = [
	validateMessage,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.render("pages/form", { errors: errors.array() });
		}

		const { authorName, text } = req.body;
		await createMessage(authorName, text, new Date());
		res.redirect("/");
	},
];
