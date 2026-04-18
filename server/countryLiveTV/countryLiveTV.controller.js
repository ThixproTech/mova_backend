const CountryLiveTV = require("./countryLiveTV.model");
const Stream = require("../stream/stream.model");

//axios
const axios = require("axios");

//create countryLiveTV from IPTV for admin
exports.getStore = async (req, res) => {
  try {
    await axios
      .get("https://iptv-org.github.io/api/countries.json")
      .then(async (res) => {
        await res.data.map(async (data) => {
          //console.log("response -----", res.data);
          //console.log("response length-----", res.data.length);

          const countryLiveTV = new CountryLiveTV();

          countryLiveTV.countryName = data.name.toLowerCase().trim();
          countryLiveTV.countryCode = data.code;
          countryLiveTV.flag = data.flag;
          await countryLiveTV.save();

          //console.log("countryLiveTV---", countryLiveTV);
        });
      })
      .catch((error) => console.log(error));
    return res.status(200).json({ status: true, message: "CountryLiveTV Imported Successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server error",
    });
  }
};

//get countryLiveTV from IPTV for admin
exports.get = async (req, res) => {
  try {
    const countryLiveTV = await CountryLiveTV.find().sort({ createdAt: -1 });

    return res.status(200).json({ status: true, message: "Success", countryLiveTV });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//if isIptvAPI false then get country wise channel and stream ,if isIptvAPI true then get country wise channel and stream added by admin
// exports.getStoredetail = async (req, res) => {
//   try {
//     if (!req.query.countryName) return res.status(200).json({ status: false, message: "countryName must be required." });

//     const country = await CountryLiveTV.findOne({ countryName: req.query.countryName.toLowerCase().trim() });
//     if (!country) {
//       return res.status(200).json({ status: false, message: "country does not found for liveTv." });
//     }

//     //for handle IPTVdata
//     const IPTVdata = settingJSON.isIptvAPI;

//     if (country) {
//       //channel json imported
//       const configChannel = {
//         method: "GET",
//         url: "https://iptv-org.github.io/api/channels.json",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const channelJson = await axios(configChannel);

//       //stream json imported
//       const configStream = {
//         method: "GET",
//         url: "https://iptv-org.github.io/api/streams.json",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const streamJson = await axios(configStream);

//       const channelData = [];
//       await channelJson?.data?.map(async (data) => {
//         if (data.country === country.countryCode) {
//           const channel = {};

//           channel.channelId = data.id;
//           channel.channelName = data.name;
//           channel.country = data.country;
//           channel.image = data.logo;

//           channelData.push(channel);
//         }
//       });

//       const streamData = [];
//       await streamJson?.data?.map(async (dataStream) => {
//         //map in channelData for match channelId
//         const streamRecord = channelData.find((c) => c.channelId === dataStream.channel);

//         if (streamRecord) {
//           const stream = {};

//           stream.channelId = dataStream.channel;
//           stream.streamURL = dataStream.url;
//           stream.channelName = streamRecord.channelName;
//           stream.channelLogo = streamRecord.image;
//           stream.countryCode = streamRecord.country;

//           streamData.push(stream);
//         }
//       });

//       return res.status(200).json({
//         status: true,
//         message: "Success",
//         //streamData,
//         streamData: IPTVdata === false ? streamData : [],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ status: false, error: error.message || "Internal Server error" });
//   }
// };

exports.getStoredetail = async (req, res) => {
  try {
    const { countryName } = req.query;

    if (!countryName) {
      return res.status(200).json({
        status: false,
        message: "countryName must be required.",
      });
    }

    const country = await CountryLiveTV.findOne({
      countryName: countryName.toLowerCase().trim(),
    });

    if (!country) {
      return res.status(200).json({
        status: false,
        message: "country does not found for liveTv.",
      });
    }

    const IPTVdata = settingJSON.isIptvAPI;
    let streamData = [];

    if (IPTVdata === false) {
      // ✅ Use iptv-org API
      const [channelRes, streamRes, logoRes] = await Promise.all([
        axios.get("https://iptv-org.github.io/api/channels.json"),
        axios.get("https://iptv-org.github.io/api/streams.json"),
        axios.get("https://iptv-org.github.io/api/logos.json"),
      ]);

      const channels = channelRes.data;
      const streams = streamRes.data;
      const logos = logoRes.data;

      const logoMap = {};
      logos.forEach((logo) => {
        if (!logoMap[logo.channel]) {
          logoMap[logo.channel] = logo.url;
        }
      });

      const channelData = channels
        .filter((ch) => ch.country === country.countryCode)
        .map((ch) => ({
          channelId: ch.id,
          channelName: ch.name,
          country: ch.country,
          image: logoMap[ch.id] || defaultLogo,
        }));

      streamData = streams
        .filter((stream) => stream.channel)
        .map((stream) => {
          const matchedChannel = channelData.find((ch) => ch.channelId === stream.channel);
          if (!matchedChannel) return null;

          return {
            channelId: stream.channel,
            streamURL: stream.url,
            channelName: matchedChannel.channelName,
            channelLogo: matchedChannel.image,
            countryCode: matchedChannel.country,
          };
        })
        .filter(Boolean);
    } else {
      // ✅ Use streams from admin DB (with select fields)
      streamData = await Stream.find({ countryCode: country.countryCode }).select("channelId streamURL channelName channelLogo countryCode country -_id").sort({ createdAt: -1 }).lean();
    }

    return res.status(200).json({
      status: true,
      message: "Success",
      streamData,
    });
  } catch (error) {
    console.error("getStoredetail error:", error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server error",
    });
  }
};

//get country wise channel and stream for admin
// exports.getStoredetails = async (req, res) => {
//   try {
//     if (!req.query.countryName) {
//       return res.status(200).json({ status: false, message: "countryName must be required." });
//     }

//     const country = await CountryLiveTV.findOne({ countryName: req.query.countryName.toLowerCase().trim() });
//     if (!country) {
//       return res.status(200).json({ status: false, message: "country does not found for liveTv." });
//     }

//     if (country) {
//       //channel json imported
//       const configChannel = {
//         method: "GET",
//         url: "https://iptv-org.github.io/api/channels.json",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const channelJson = await axios(configChannel);

//       //stream json imported
//       const configStream = {
//         method: "GET",
//         url: "https://iptv-org.github.io/api/streams.json",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const streamJson = await axios(configStream);

//       const channelData = [];
//       await channelJson?.data?.map(async (data) => {
//         if (data.country === country.countryCode) {
//           const channel = {};

//           channel.channelId = data.id;
//           channel.channelName = data.name;
//           channel.country = data.country;
//           channel.image = data.logo;

//           channelData.push(channel);
//         }
//       });

//       // console.log("channelJson.data : ", channelJson?.data);
//       // console.log("streamJson.data : ", streamJson?.data);

//       const streamData = [];
//       await streamJson?.data?.map(async (dataStream) => {
//         //map in channelData for match channelId
//         const streamRecord = channelData.find((c) => c.channelId === dataStream.channel);
//         console.log("streamRecord: ", streamRecord);

//         if (streamRecord) {
//           const stream = {};

//           stream.channelId = dataStream.channel;
//           stream.streamURL = dataStream.url;
//           stream.channelName = streamRecord.channelName;
//           stream.channelLogo = streamRecord.image;
//           stream.countryCode = streamRecord.country;

//           streamData.push(stream);
//         }
//       });

//       return res.status(200).json({
//         status: true,
//         message: "Success",
//         streamData,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: false,
//       error: error.message || "Internal Server error",
//     });
//   }
// };

// exports.getStoredetails = async (req, res) => {
//   try {
//     if (!req.query.countryName) {
//       return res.status(200).json({ status: false, message: "countryName must be required." });
//     }

//     const country = await CountryLiveTV.findOne({ countryName: req.query.countryName.toLowerCase().trim() });
//     if (!country) {
//       return res.status(200).json({ status: false, message: "country does not found for liveTv." });
//     }

//     // Get channels.json
//     const { data: channels } = await axios.get("https://iptv-org.github.io/api/channels.json");

//     // Get streams.json
//     const { data: streams } = await axios.get("https://iptv-org.github.io/api/streams.json");

//     //console.log("channels : ", channels.slice(0, 1));
//     //console.log("streams : ", streams.slice(0, 1));

//     const channelData = channels
//       .filter((ch) => ch.country === country.countryCode)
//       .map((ch) => ({
//         channelId: ch.id,
//         channelName: ch.name,
//         country: ch.country,
//         image: ch.logo,
//       }));

//     const streamData = streams
//       .filter((s) => s.channel) // ✅ skip if channel is null
//       .map((s) => {
//         const streamRecord = channelData.find((c) => c.channelId === s.channel);
//         if (streamRecord) {
//           return {
//             channelId: s.channel,
//             streamURL: s.url,
//             channelName: streamRecord.channelName,
//             channelLogo: streamRecord.image || "",
//             countryCode: streamRecord.country,
//           };
//         }
//         return null;
//       })
//       .filter(Boolean); // remove nulls

//     return res.status(200).json({
//       status: true,
//       message: "Success",
//       streamData,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: false, error: error.message || "Internal Server error" });
//   }
// };

exports.getStoredetails = async (req, res) => {
  try {
    const { countryName } = req.query;
    if (!countryName) {
      return res.status(200).json({ status: false, message: "countryName must be required." });
    }

    const country = await CountryLiveTV.findOne({
      countryName: countryName.toLowerCase().trim(),
    });

    if (!country) {
      return res.status(200).json({ status: false, message: "country does not found for liveTv." });
    }

    const [channelsRes, streamsRes, logosRes] = await Promise.all([
      axios.get("https://iptv-org.github.io/api/channels.json"),
      axios.get("https://iptv-org.github.io/api/streams.json"),
      axios.get("https://iptv-org.github.io/api/logos.json"),
    ]);

    const channels = channelsRes.data;
    const streams = streamsRes.data;
    const logos = logosRes.data;

    const logoMap = {};
    logos.forEach((logo) => {
      if (!logoMap[logo.channel]) {
        logoMap[logo.channel] = logo.url;
      }
    });

    const filteredChannels = channels.filter((ch) => ch.country === country.countryCode);

    const streamData = streams
      .filter((s) => s.channel)
      .map((s) => {
        const ch = filteredChannels.find((c) => c.id === s.channel);
        if (!ch) return null;

        return {
          channelId: ch.id,
          channelName: ch.name,
          channelLogo: logoMap[ch.id] || null,
          countryCode: ch.country,
          streamURL: s.url,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      status: true,
      message: "Success",
      streamData,
    });
  } catch (error) {
    console.error("Error in getStoredetails:", error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};
