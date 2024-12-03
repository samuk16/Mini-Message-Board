import { Router } from "express";
const newMessageRouter = Router();
import {
	getTemplateForm,
	newMessagePost,
} from "../controllers/newMessageController";

newMessageRouter.get("/", getTemplateForm);

newMessageRouter.post("/", ...newMessagePost);

export default newMessageRouter;
