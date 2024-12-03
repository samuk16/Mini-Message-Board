import { Router } from "express";
import { getMessagesGet } from "../controllers/indexController";
const indexRouter = Router();

indexRouter.get("/", getMessagesGet);

export default indexRouter;
