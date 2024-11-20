import mongoose from "mongoose";
import bcrypt from "bcrypt"

const Schema = mongoose.Schema;



const usersSchema = new Schema(
  {
    username: {
      unique: true,
      type: String,
      min: 3,
      max: 20,
      required: true,
    }, // String is shorthand for {type: String}

    password: {
      required: true,
      type: String,
      min: 1,
    },

    email: {
      unique: true,
      required: true,
      type: String,
      min: 3,
      max: 20,
    },

    rol: {
      type: String,
      default: "user",
    },

    location: {
      country: String,
      state: String,
      city: String,
    },

    address: String,

    birthDate: Date,

    gender: String,

    sorteos: [{ type: Schema.Types.ObjectId, ref: "sorteos" }],

    valid: {
      type: Boolean,
      default: false,
    },

    key: {
      type: String,
    },

    avatar: {
      type: String,
      default: "pictures/users/avatar.png",
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    //generate password hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    //generate key activate hash
    this.key = await bcrypt.hash(this.email + this.user, salt);

    return next();
  } catch (error) {
    return next(erro);
  }
});

usersSchema.methods.generateKey = async function (key) {
  const salt = await bcrypt.genSalt(10);
  this.key = await bcrypt.hash(this.email + this.user, salt);
  return this.key == key;
};

usersSchema.methods.validatePassword = async function validatePassword(data) {
  return await bcrypt.compare(data, this.password);
};

usersSchema.methods.validateUser = function validatePassword(key) {
  return this.key == key;
};

const Users = mongoose.model("Users", usersSchema);


export default Users
