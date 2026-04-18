const Setting = require("./setting.model");

//update Setting
exports.update = async (req, res) => {
  try {
    if (!req.query.settingId) return res.status(200).json({ status: false, message: "SettingId is requried!" });

    const setting = await Setting.findById(req.query.settingId);
    if (!setting) {
      return res.status(200).json({ status: false, message: "Setting does not found!" });
    }

    setting.googlePlayEmail = req.body.googlePlayEmail ? req.body.googlePlayEmail : setting.googlePlayEmail;
    setting.googlePlayKey = req.body.googlePlayKey ? req.body.googlePlayKey : setting.googlePlayKey;
    setting.stripePublishableKey = req.body.stripePublishableKey ? req.body.stripePublishableKey : setting.stripePublishableKey;
    setting.stripeSecretKey = req.body.stripeSecretKey ? req.body.stripeSecretKey : setting.stripeSecretKey;
    setting.privacyPolicyLink = req.body.privacyPolicyLink ? req.body.privacyPolicyLink : setting.privacyPolicyLink;
    setting.termConditionLink = req.body.termConditionLink ? req.body.termConditionLink : setting.termConditionLink;
    setting.privacyPolicyText = req.body.privacyPolicyText ? req.body.privacyPolicyText : setting.privacyPolicyText;
    setting.resendApiKey = req.body.resendApiKey ? req.body.resendApiKey : setting.resendApiKey;
    setting.currency = req.body.currency ? req.body.currency : setting.currency;
    setting.razorPayId = req.body.razorPayId ? req.body.razorPayId : setting.razorPayId;
    setting.razorSecretKey = req.body.razorSecretKey ? req.body.razorSecretKey : setting.razorSecretKey;
    setting.flutterWaveId = req.body.flutterWaveId ? req.body.flutterWaveId : setting.flutterWaveId;
    setting.durationOfShorts = req.body.durationOfShorts ? Number(req.body.durationOfShorts) : setting.durationOfShorts;
    setting.privateKey = req.body.privateKey ? JSON.parse(req.body.privateKey?.trim()) : setting.privateKey;

    setting.doEndpoint = req.body.doEndpoint ? req.body.doEndpoint : setting.doEndpoint;
    setting.doAccessKey = req.body.doAccessKey ? req.body.doAccessKey : setting.doAccessKey;
    setting.doSecretKey = req.body.doSecretKey ? req.body.doSecretKey : setting.doSecretKey;
    setting.doHostname = req.body.doHostname ? req.body.doHostname : setting.doHostname;
    setting.doBucketName = req.body.doBucketName ? req.body.doBucketName : setting.doBucketName;
    setting.doRegion = req.body.doRegion ? req.body.doRegion : setting.doRegion;

    setting.awsEndpoint = req.body.awsEndpoint ? req.body.awsEndpoint : setting.awsEndpoint;
    setting.awsAccessKey = req.body.awsAccessKey ? req.body.awsAccessKey : setting.awsAccessKey;
    setting.awsSecretKey = req.body.awsSecretKey ? req.body.awsSecretKey : setting.awsSecretKey;
    setting.awsHostname = req.body.awsHostname ? req.body.awsHostname : setting.awsHostname;
    setting.awsBucketName = req.body.awsBucketName ? req.body.awsBucketName : setting.awsBucketName;
    setting.awsRegion = req.body.awsRegion ? req.body.awsRegion : setting.awsRegion;

    await setting.save();

    updateSettingFile(setting);

    return res.status(200).json({
      status: true,
      message: "Setting Updated Successfully!",
      setting,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//handle setting switch
exports.handleSwitch = async (req, res) => {
  try {
    const setting = await Setting.findById(req.query.settingId);
    if (!setting) return res.status(200).json({ status: false, message: "Setting does not found!" });

    if (req.query.type === "googlePlay") {
      setting.googlePlaySwitch = !setting.googlePlaySwitch;
    } else if (req.query.type === "stripe") {
      setting.stripeSwitch = !setting.stripeSwitch;
    } else if (req.query.type === "razorPay") {
      setting.razorPaySwitch = !setting.razorPaySwitch;
    } else if (req.query.type === "flutterWave") {
      setting.flutterWaveSwitch = !setting.flutterWaveSwitch;
    } else if (req.query.type === "IptvAPI") {
      setting.isIptvAPI = !setting.isIptvAPI;
    } else {
      setting.isAppActive = !setting.isAppActive;
    }

    await setting.save();

    updateSettingFile(setting);

    return res.status(200).json({ status: true, message: "Success", setting });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//get setting data
exports.index = async (req, res) => {
  try {
    const setting = settingJSON ? settingJSON : null;
    if (!setting) {
      return res.status(200).json({ status: false, message: "Setting data does not found!" });
    }

    return res.status(200).json({ status: true, message: "Success", setting: setting });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//handle update storage
exports.toggleStorageOption = async (req, res) => {
  try {
    const settingId = req?.query?.settingId;
    const type = req?.query?.type?.trim();

    if (!settingId || !type) {
      return res.status(200).json({ status: false, message: "Oops! Invalid details." });
    }

    const setting = await Setting.findById(settingId);
    if (!setting) {
      return res.status(200).json({ status: false, message: "Setting not found." });
    }

    const current = setting.storage;

    const updatedStorage = { ...current };

    if (type === "local") {
      updatedStorage.local = !updatedStorage.local;
      if (updatedStorage.local) {
        updatedStorage.awsS3 = false;
        updatedStorage.digitalOcean = false;
      }
    } else if (type === "awsS3") {
      updatedStorage.awsS3 = !updatedStorage.awsS3;
      if (updatedStorage.awsS3) {
        updatedStorage.local = false;
        updatedStorage.digitalOcean = false;
      }
    } else if (type === "digitalOcean") {
      updatedStorage.digitalOcean = !updatedStorage.digitalOcean;
      if (updatedStorage.digitalOcean) {
        updatedStorage.local = false;
        updatedStorage.awsS3 = false;
      }
    } else {
      return res.status(200).json({ status: false, message: "Invalid storage type provided." });
    }

    const oneTrue = updatedStorage.local || updatedStorage.awsS3 || updatedStorage.digitalOcean;
    if (!oneTrue) {
      return res.status(200).json({ status: false, message: "At least one storage option must remain enabled." });
    }

    setting.storage = updatedStorage;

    res.status(200).json({
      status: true,
      message: "Storage setting updated successfully",
      data: setting,
    });

    await setting.save();
    updateSettingFile(setting);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};
