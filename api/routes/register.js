const router = require("express").Router();
const User = require("../models/user");
const { debug } = require("../modules/dumper");
const tokinit = require("../modules/tokinit");

let bcrypt = require("bcrypt");

const file = "register.js";

// Users Registration
router.post("/signup", async (req, res) => {
  debug('route signup',false,'signup')
  const location = `${file} : post "/signup"`;
  // ? CHECK IF EMAIL EXISTS
  let check_email = await User.findOne({ email: req.body.email });
  if (check_email) {
    debug("EMAIL EXISTANT", false);
    return res.status(200).json({
      input: "email",
      success: false,
      message: "There is an existing user with that email address",
    });
  }

  // ? HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.credentials.password, salt);

  validation_token = tokinit(24);

  try {
    const informations = {
      firstName: req.body.informations.firstName,
      lastName: req.body.informations.lastName,
    };

    const credentials = {
      username: req.body.credentials.username,
      email: req.body.credentials.email,
      password: req.body.credentials.password,
    };

    const user = new User({
      informations: informations,
      credentials: credentials,
    }).save();

    let token = jwt.sign(
      {
        user: {
          email: user.credentials.email,
          loginToken: user.credentials.loginToken,
          username: user.credentials.username,
          emailValidated: user.account.emailValidation.status,
          createdAt: user.account.createdAt,
          role: user.account.role,
          id: user._id,
        },
      },
      process.env.TOKEN_SECRET,
      {}
    );

    return res.status(201).json({
      created_id: user._id,
      success: true,
      message: "Youre account has been user successfully",
      token: token,
      user: {
        email: user.credentials.email,
        loginToken: user.credentials.loginToken,
        username: user.credentials.username,
        emailValidated: user.account.emailValidation.status,
        createdAt: user.account.createdAt,
        role: user.account.role,
      },
    });
  } catch (error) {
    console.log('route signup / catch')
    debug(error, false, location);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// Users Connection
router.post("/login", async (req, res) => {
  const location = `${file} : post "/login"`;
  if (
    (!req.body.credentials.email ||
    !req.body.credentials.username ) && 
    !req.body.credentials.password 
  ) {
    return res.status(200).json({
      success: false,
      message: "Please enter your infomations",
    });
  }

  const user = await User.findOne({
    $or: [
      { "credentials.username": req.body.credentials.username },
      { "credentials.email": req.body.credentials.email },
    ],
  });
  if (!user) {
    return res.status(200).json({
      success: false,
      message: "No user found with this username or email address",
    });
  }
  try {
    bcrypt.compare(
      req.body.password,
      user.credentials.password,
      async function (err, isMatch) {
        if (err) return res.status(500).json({ error: err });
        if (isMatch) {
          let token = jwt.sign(
            {
              user: {
                email: user.credentials.email,
                loginToken: user.credentials.loginToken,
                username: user.informations.username,
                emailValidated: user.account.emailValidation.status,
                createdAt: user.account.createdAt,
                role: user.account.role,
                id: user._id,
              },
            },
            process.env.TOKEN_SECRET,
            {}
          );

          user.lastLogin = new Date();
          await user.save();
          return res.status(200).json({
            success: true,
            message: "You are successfully logged in",
            token: token,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Password incorect",
          });
        }
      }
    );
  } catch (error) {
    debug(error, false, location);
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
});

// Guets Connection
router.post("/loginGuest", async (req, res) => {
  const location = `${file} : post : "/loginGuest"`;

  try {
    const credentials = {
      email: `${tokinit(10)}@gmail.com`,
      password: await bcrypt.hash(tokinit(12), await bcrypt.genSalt(10)),
      username: `User${Date.now()}${Math.random()
        .toString(36)
        .replace("0.", "")}`,
      loginToken: uuidv4(),
    };

    const account = {
      emailValidation: {
        validationToken: uuidv4(),
      },
      role: "guest",
    };

    const guest = await new User({
      credentials: credentials,
      account: account,
    }).save();

    let token = jwt.sign(
      {
        user: {
          email: guest.credentials.email,
          username: guest.informations.username,
          createdAt: guest.account.createdAt,
          role: guest.account.role,
          id: guest._id,
        },
      },
      process.env.TOKEN_SECRET,
      {}
    );
    return res.json(200).json({
      success: true,
      message: "You are successfully logged in",
      token: token,
      user: {
        email: user.credentials.email,
        username: user.credentials.username,
        createdAt: user.account.createdAt,
        role: user.account.role,
      },
    });
  } catch (error) {
    debug(error, false, location);
    return;
  }
});

module.exports = router;
