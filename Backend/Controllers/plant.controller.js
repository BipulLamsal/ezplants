const Plant = require("../Models/plant.model");

async function createPlant(req, res) {
  try {
    const { name, description, image, stock, price } = req.body;
    const newPlant = new Plant({ name, description, image, stock, price });
    await newPlant.save();
    return res.status(201).json({ success: true, plant: newPlant });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getAllPlants(req, res) {
  try {
    const plants = await Plant.find();
    return res.status(200).json({ success: true, plants });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getPlantById(req, res) {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ success: false, error: "Plant not found" });
    }
    return res.status(200).json({ success: true, plant });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function updatePlantById(req, res) {
  try {
    const { name, description, image, stock, price } = req.body;
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      { name, description, image, stock, price },
      { new: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ success: false, error: "Plant not found" });
    }
    return res.status(200).json({ success: true, plant: updatedPlant });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function deletePlantById(req, res) {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ success: false, error: "Plant not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Plant deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlantById,
  deletePlantById,
};
