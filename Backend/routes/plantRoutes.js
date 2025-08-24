import express from "express";
import { getPlants, addPlant } from "../controllers/plantController.js";

const router = express.Router();

router.route("/").get(getPlants).post(addPlant);

export default router;
