// const { Router } = require("express");
import { Router } from "express";
const newMessageRouter = Router();
import {
	getTemplateForm,
	postNewMessage,
} from "../controllers/newMessageController";

newMessageRouter.get("/", getTemplateForm);

newMessageRouter.post("/", postNewMessage);

// module.exports = newMessageRouter;
export default newMessageRouter;
