import { Router } from "express";
const messageDetailsRouter = Router();
import { getMessageDetails } from "../controllers/messageDetailsController";

messageDetailsRouter.get("/", getMessageDetails);

export default messageDetailsRouter;
