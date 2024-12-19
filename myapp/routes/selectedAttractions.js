const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// define schema
const selectedAttractionsSchema = new mongoose.Schema({
  Description: String,
  Name: String,
  Px: Number,
  Py: Number,
  Tags: [String],
  Region: String
  });

// create model
const SelectedAttraction = mongoose.model('SelectedAttraction', selectedAttractionsSchema);

// return selectedAttractions
router.get("/", async (req, res) => {
  try {
      const selectedAttractions = await SelectedAttraction.find();
      res.status(200).json(selectedAttractions);
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

router.post('/update-selected-attractions', async (req, res) => {
  try {
      console.log(req.body);
      const reqSelectedAttractions = req.body;

      // 清空資料庫中的所有景點
      await SelectedAttraction.deleteMany({});

      // 將 req.body 中的景點插入資料庫
      await SelectedAttraction.insertMany(reqSelectedAttractions);

      res.status(201).json({ success: true, message: 'Selected attractions updated successfully' });
  } catch (err) {
      console.error("Error updating attractions:", err);
      res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
});
module.exports = router;