const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.get("/filterimages", async (req, res) => {
  try {
    // get the category and the page number , and the limit
    const { category, page, limit } = req.query;

    //store the filteredImages here
    let filteredImages;

    //calculate the skip value
    const skip = page && page * 1 > 0 ? (page - 1) * limit : 0;
    // const skip = (page - 1) * limit;

    if (category.toLowerCase() !== "all") {
      filteredImages = await Image.find({
        category: { $regex: `^${category}$`, $options: "i" },
      })
        .skip(skip)
        .limit(limit);
    } else {
      filteredImages = await Image.find().skip(skip).limit(limit);
    }

    console.log(req.query);
    return res.status(200).json({ status: "success", data: filteredImages });
  } catch (err) {
    return res.status(404).json({ status: err, message: "Unknown category!" });
  }
});

module.exports = router;
