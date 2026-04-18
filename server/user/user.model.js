const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    nickName: { type: String, default: "" },
    image: { type: String, default: "" },
    email: { type: String, default: "" },
    gender: { type: String, default: "" },
    country: { type: String, default: "" },
    mobileNumber: { type: String, default: null },
    password: { type: String, default: null },
    uniqueId: { type: String, default: null },
    loginType: { type: Number, enum: [0, 1, 2, 3, 4, 5] }, //0.google 1.Apple 2.quick 3.email-password 4.email-otp 5.mobile
    interest: { type: Array, default: [] },
    referralCode: { type: String },
    fcmToken: { type: String, default: null },
    identity: { type: String },
    date: { type: String },

    notification: {
      GeneralNotification: { type: Boolean, default: true },
      NewReleasesMovie: { type: Boolean, default: true },
      AppUpdate: { type: Boolean, default: true },
      Subscription: { type: Boolean, default: true },
    },

    isBlock: { type: Boolean, default: false },
    isPremiumPlan: { type: Boolean, default: false },
    plan: {
      planStartDate: { type: String, default: null }, // Premium plan start date
      planEndDate: { type: String, default: null }, // Premium plan end date
      premiumPlanId: { type: mongoose.Schema.Types.ObjectId, ref: "PremiumPlan", default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
