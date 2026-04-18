const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    image: { type: String, trim: true },
    purchaseCode: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
