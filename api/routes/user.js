const express = require("express");
const router = express.Router();
const User = require("../models/user");

const file = "user.js"

// Get all users
router.get("/users", secureApiAdmin, async (req, res) => {
  const location = `${file} : get "/users"`
    const limit = parseInt(req.query.limit || 10);
  const offset = parseInt(req.query.offset || 0);
  let sort = {};
  let query = {};

  if (req.query.sortBy && req.query.sortDesc)
    if (req.query.sortBy == "firstname")
      sort = { firstname: req.query.sortDesc == "true" ? -1 : 1 };

  if (req.query.filterBy)
    query.$or = [{ firstname: { $regex: req.query.filterBy, $options: "i" } }];

  try {
    const users = await User.find(query).sort(sort).limit(limit).skip(offset);
    const total_count = await User.countDocuments(query);
    if (users.length === 0) {
      return res.status(200).json({
        success: false,
        message: "NO USER FOUND",
      });
    }
    return res.status(200).json({
      users: users,
      total_count: total_count,
      success: true,
      message: "GET USERS SUCCESSFULLY",
    });
  } catch (error) {
    debug(error, false);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// Get user by id
router.get("/user:id", secureApi, async (req, res) => {});

// Update user
router.put("/updateProfile:id", secureApi, async (req, res) => {});
    
module.exports = router;
