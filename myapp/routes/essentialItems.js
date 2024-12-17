const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// define schema
const essentialItemSchema = new mongoose.Schema({
  Name: String,
  Category: String,
  IsBring: Boolean
});
// create model
const EssentialItem = mongoose.model('EssentialItem', essentialItemSchema);

// return essentialItems
router.get("/", async (req, res) => {
    try {
        const essentialItems = await EssentialItem.find();
        res.status(200).json(essentialItems);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
  });

  router.post('/update-essentialItems', async (req, res) => {
    try {
        console.log(req.body);
        const essentialItems = req.body;
  
        // 清空資料庫中的所有景點
        await EssentialItem.deleteMany({});
  
        // 將 req.body 中的景點插入資料庫
        await EssentialItem.insertMany(essentialItems);
  
        res.status(201).json({ success: true, message: 'essentialItems updated successfully' });
    } catch (err) {
        console.error("Error updating essentialItems:", err);
        res.status(500).json({ success: false, message: 'Error: ' + err.message });
      }
  });
module.exports = router;