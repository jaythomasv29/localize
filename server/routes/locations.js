const router = require("express").Router()
const Location = require('../models/Location')
const { verifyToken } = require("../utils/verifyToken")

// get all pins based on username by querying database
router.post("/", async (req, res) => {
  const location = new Location(req.body)
  try {
    const savedLocation = await location.save()
    res.status(200).json(savedLocation)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get user's saved locations based on who is logged in
router.get("/", verifyToken, async (req, res) => {
  try {
    const usersFavorites = await Location.find({username: req.user.username})
    res.status(200).json(usersFavorites)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router