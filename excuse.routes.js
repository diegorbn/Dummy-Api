import { Router } from "express";
import excuseController from "./excuse.controller.js";

const excuseRouter = Router();

excuseRouter.get("/excuse/something", excuseController.sayHello);

excuseRouter.get("/excuses", excuseController.getAllExcuses);

excuseRouter.get("/excuses/random", excuseController.getRandomExcuse);

excuseRouter.get("/excuses/:id", excuseController.getExcuseById);

excuseRouter.post("/excuses", excuseController.createExcuse);

excuseRouter.put("/excuses/:id", excuseController.updateExcuse);

excuseRouter.delete("/excuses/:id", excuseController.deleteExcuse);

export default excuseRouter;