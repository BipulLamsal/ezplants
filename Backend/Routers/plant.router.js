const express = require("express");
const router = express.Router();
const plantController = require("../Controllers/plant.controller");
const {
  authAdminMiddleware,
} = require("../Controllers/customer.auth.controller");

const { authenticateJWT } = require("../Middlewares/auth.middleware");
router.post(
  "/add",
  authenticateJWT,
  authAdminMiddleware,
  plantController.createPlant
);
router.get("/", plantController.getAllPlants);
router.get("/:id", plantController.getPlantById);
router.put(
  "/:id",
  authenticateJWT,
  authAdminMiddleware,
  plantController.updatePlantById
);
router.delete(
  "/:id",
  authenticateJWT,
  authAdminMiddleware,
  plantController.deletePlantById
);
module.exports = router;
