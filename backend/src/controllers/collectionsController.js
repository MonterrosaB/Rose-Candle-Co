// Array de métodos (C R U D)
const collectionsController = {};

import CollectionModel from "../models/Collections.js";

// GET
collectionsController.getCollections = async (req, res) => {
  const collections = await CollectionModel.find();
  res.json(collections);
};

// POST
collectionsController.createCollection = async (req, res) => {
  const { name } = req.body;
  const newCollection = new CollectionModel({ name });
  await newCollection.save();
  res.json({ message: "Collection saved" });
};

// PUT
collectionsController.updateCollection = async (req, res) => {
  const { collection } = req.body;
  await CollectionModel.findByIdAndUpdate(
    req.params.id,
    { collection },
    { new: true }
  );
  res.json({ message: "Collection updated" });
};

// DELETE
collectionsController.deleteCollection = async (req, res) => {
  await CollectionModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Collection deleted" });
};

export default collectionsController;
