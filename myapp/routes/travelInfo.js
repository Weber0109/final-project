const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// define schema
const travelInfoSchema = new mongoose.Schema({
  city: String,
  personCount: Number,
  startDate: String,
  endDate: String
  });

// create model
const TravelInfo = mongoose.model('TravelInfo', travelInfoSchema);

// return travelInfo
router.get("/", async (req, res) => {
  try {
      const travelInfo = await TravelInfo.find();
      res.status(200).json(travelInfo);
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

router.post('/update-travelInfo', async (req, res) => {
  try {
      console.log(req.body);
      const reqTravelInfo = req.body;

      // 清空資料庫中的所有景點
      await TravelInfo.deleteMany({});

      // 將 req.body 中的景點插入資料庫
      await TravelInfo.insertMany(reqTravelInfo);

      res.status(201).json({ success: true, message: 'travelInfo updated successfully' });
  } catch (err) {
      console.error("Error updating travelInfo:", err);
      res.status(500).json({ success: false, message: 'Error: ' + err.message });
    }
});
module.exports = router;