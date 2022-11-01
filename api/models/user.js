const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  informations: {
    image: {
      type: Schema.Types.ObjectId,
      ref: "Files",
      set: function (image) {
        this._previous_image = this.informations.image;
        return image;
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    sex: {
      type: String, 
    },
    birthDate: {
      type: Date,
    },
    phone: {
      type: String,
    },
    adress: {
      number: {
        type: String,
      },
      street: {
        type: String,
      },
      zip: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      optional: {
        type: String,
      },
    },
  },
  credentials: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginToken: {
      type: String,
    },
  },
  account: {
    created_at: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user", // "dev" , "admin"
    },
    last_login: {
      type: Date,
    },
    validation_token: {
      type: String,
      default: null,
    },
    emailValidation: {
      status: {
        type: Boolean,
        default: false,
      },
      validationToken: {
        type: String,
      },
    },
    passwordRecovery: {
      recoveryToken: {
        type: String,
      },
      recoveryTokenCreatedAt: {
        type: Date,
      },
    }
  },
});

//  
UserSchema.pre("save", { document: true, query: false }, async function (
  next
) {
  const bcrypt = require("bcryptjs");
  const uuidv4 = require("uuid/v4");
  const File = require("../modeFls/file");

  if (this.isModified("password")) {
    this.credentials.password = await bcrypt.hash(this.credentials.password, await bcrypt.genSalt(10));
    this.credentials.loginToken = uuidv4();
  }
  if (this.isModified("image")) {
    if (this._previous_image && this.informations.image !== this._previous_image) {
      let file = await File.findById(this._previous_image);
      file ? file.remove() : null;
    }
  }
  next();
});

// Pre Delete 
UserSchema.pre("deleteOne", async function (next) {
  const User = require("../models/users");
  const File = require("../models/file");
  let user = await User.findById(this.getQuery()["_id"]);
  if (user.informations.image) {
    let file = await File.findById(user.informations.image);
    file.remove();
  };
  next();
});

module.exports = mongoose.model("User", UserSchema);
