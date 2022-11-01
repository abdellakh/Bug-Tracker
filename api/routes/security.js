const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { isAllowed, isAdmin } = require("../modules/userController");

const file = "guest.js";

// Check for app middlewares
router.post("/checkRoute", function (req, res) {
  const location = `${file} : post "/checkRoute"`;
  try {
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.status(500).json({
              success: true,
              message: "Error in token verify.",
            });
          } else {
            // Token is valid and decoded
            const check = await isAllowed(decoded);
            if (!check.success) {
              return res.status(200).json({
                success: false,
              });
            }

            await User.updateOne(
              { _id: decoded.user.id },
              { lastLogin: new Date() }
            );

            return res.status(200).json({
              success: true,
              token: req.headers.authorization,
              user: {
                email: check.user.credentials.email,
                loginToken: check.user.credentials.loginToken,
                username: check.user.credentials.username,
                emailValidated: check.user.account.emailValidation.status,
                createdAt: check.user.account.createdAt,
                role: check.user.account.role,
                id: check.user._id,
              },
            });
          }
        }
      );
    } else {
      // No token
      return res
        .status(403)
        .json({ success: false, message: "Token not found" });
    }
  } catch (error) {
    debug(error, false, location);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// User middleware
global.secureApi = function (req, res, next) {
  const location = `${file} : connectedUser`;
  try {
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        async function (Err, decoded) {
          if (Err) return res.status(403).send("Invalid token");
          else {
            req.decodedToken = decoded;
            next();
          }
        }
      );
    } else {
      return res.status(403).send("Invalid token");
    }
  } catch (error) {
    debug(error, false, location);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Admin middleware
global.secureApiAdmin = function (req, res, next) {
  const location = `${file} : connectedUser`;
  try {
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET,
        async function (err, decoded) {
          if (err) return res.status(403).send("Invalid token");
          else {
            if (await isAdmin(decoded)) {
              req.decodedToken = decoded;
              next();
            } else {
              return res.status(403).send("Permission denied");
            }
          }
        }
      );
    } else {
      return res.status(403).send("Invalid token");
    }
  } catch (error) {
    debug(error, false, location);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};


module.exports = router;
