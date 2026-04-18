//Mongoose
const mongoose = require("mongoose");

//Setting Schema
const settingSchema = new mongoose.Schema(
  {
    googlePlayEmail: { type: String, default: "GOOGLE PLAY EMAIL" },
    googlePlayKey: { type: String, default: "GOOGLE PLAY KEY" },
    stripePublishableKey: { type: String, default: "STRIPE PUBLISHABLE KEY" },
    stripeSecretKey: { type: String, default: "STRIPE SECRET KEY" },
    razorPayId: { type: String, default: "RAZOR PAY ID" },
    razorSecretKey: { type: String, default: "RAZOR SECRET KEY" },
    flutterWaveId: { type: String, default: "FLUTTER WAVE ID" },

    privacyPolicyLink: { type: String, default: "PRIVACY POLICY LINK" },
    privacyPolicyText: { type: String, default: "PRIVACY POLICY TEXT" },
    termConditionLink: { type: String, default: "TERM AND CODITION LINK" },

    googlePlaySwitch: { type: Boolean, default: false },
    stripeSwitch: { type: Boolean, default: false },
    razorPaySwitch: { type: Boolean, default: false },
    flutterWaveSwitch: { type: Boolean, default: false },

    resendApiKey: { type: String, default: "RESEND API KEY" },

    //Storage Settings
    storage: {
      local: { type: Boolean, default: true }, // Local storage active by default
      awsS3: { type: Boolean, default: false },
      digitalOcean: { type: Boolean, default: false },
    },

    //DigitalOcean Spaces
    doEndpoint: { type: String, default: "" },
    doAccessKey: { type: String, default: "" },
    doSecretKey: { type: String, default: "" },
    doHostname: { type: String, default: "" },
    doBucketName: { type: String, default: "" },
    doRegion: { type: String, default: "" },

    //AWS S3
    awsEndpoint: { type: String, default: "" },
    awsAccessKey: { type: String, default: "" },
    awsSecretKey: { type: String, default: "" },
    awsHostname: { type: String, default: "" },
    awsBucketName: { type: String, default: "" },
    awsRegion: { type: String, default: "" },

    durationOfShorts: { type: Number, default: 0 },

    isAppActive: { type: Boolean, default: true },

    //for iptv API data handle
    isIptvAPI: { type: Boolean, default: true },

    paymentGateway: { type: Array, default: [] },
    currency: { type: String, default: "$" },
    privateKey: { type: Object, default: {} }, //firebase.json handle notification
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);
