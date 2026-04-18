const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema(
  {
    //android
    native: { type: String, default: null },
    interstitial: { type: String, default: null },
    reward: { type: String, default: null },
    banner: { type: String, default: null },

    //ios
    nativeIos: { type: String, default: null },
    rewardIos: { type: String, default: null },
    bannerIos: { type: String, default: null },
    interstitialIos: { type: String, default: null },

    imaTagsUrl: { type: [String], default: [] },

    isGoogleAdd: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Advertisement", advertisementSchema);
