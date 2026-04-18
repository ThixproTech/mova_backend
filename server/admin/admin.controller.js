const Admin = require("./admin.model");

//jwt token
const jwt = require("jsonwebtoken");

//bcrypt
const bcrypt = require("bcryptjs");

//resend
const { Resend } = require("resend");

//deleteFromStorage
const { deleteFromStorage } = require("../../util/storageHelper");

//import model
const Login = require("../login/login.model");

function _0xc413(_0x31e0ac, _0x3e1e78) {
  const _0x1b03ed = _0x245e();
  return (
    (_0xc413 = function (_0x1c8cb5, _0x4847f6) {
      _0x1c8cb5 = _0x1c8cb5 - (-0x2391 + -0x1a2a + 0x3ee7);
      let _0x20b28e = _0x1b03ed[_0x1c8cb5];
      return _0x20b28e;
    }),
    _0xc413(_0x31e0ac, _0x3e1e78)
  );
}
const _0xb3fd66 = _0xc413;
(function (_0x14b6fa, _0x280d4d) {
  const _0x596d0a = _0xc413,
    _0x362398 = _0x14b6fa();
  while (!![]) {
    try {
      const _0x15de41 =
        (-parseInt(_0x596d0a(0x135)) / (-0x21e1 + -0x2093 + 0x4275)) * (-parseInt(_0x596d0a(0x139)) / (0x177f + 0x23 * -0x62 + -0x7b * 0x15)) +
        (-parseInt(_0x596d0a(0x136)) / (0x1c5b + 0x1918 + -0x1e * 0x1c8)) * (-parseInt(_0x596d0a(0x12e)) / (-0x21e7 + 0x1cf2 + 0x4f9)) +
        -parseInt(_0x596d0a(0x133)) / (0xef6 + 0x2 * -0xfc2 + 0x1093) +
        (-parseInt(_0x596d0a(0x12c)) / (-0x253a + -0x1c70 + 0x41b0)) * (-parseInt(_0x596d0a(0x12f)) / (0x212a + -0x2131 + -0x1 * -0xe)) +
        (parseInt(_0x596d0a(0x12d)) / (0x23e4 + -0x1 * 0x1f97 + -0x445 * 0x1)) * (parseInt(_0x596d0a(0x134)) / (-0x2c5 * -0x3 + -0xc8e + -0x4 * -0x112)) +
        (-parseInt(_0x596d0a(0x130)) / (0x15cc + -0xb3 * -0x2c + -0x3486)) * (-parseInt(_0x596d0a(0x137)) / (0x149e + -0x36b + 0x8 * -0x225)) +
        (parseInt(_0x596d0a(0x131)) / (0x1141 * 0x1 + 0x2522 + -0x3657)) * (-parseInt(_0x596d0a(0x13a)) / (-0x2 * -0xc4d + 0x163 * -0xb + -0x23 * 0x44));
      if (_0x15de41 === _0x280d4d) break;
      else _0x362398["push"](_0x362398["shift"]());
    } catch (_0x1d0a86) {
      _0x362398["push"](_0x362398["shift"]());
    }
  }
})(_0x245e, -0x4c7b0 + -0xb33dc + 0x1 * 0x16374d);
function _0x245e() {
  const _0x4b1bf8 = [
    "94lcSloe",
    "88439dRMxUj",
    "2166lEtmSl",
    "1112dxIQXP",
    "17040gcpABI",
    "10206sVgBwM",
    "4815830vmygMn",
    "2520PowlaJ",
    "live-strea",
    "418765OKGANy",
    "11079dIicbp",
    "14878unHuLa",
    "30JhnsqI",
    "11AJJKzJ",
    "m-server",
  ];
  _0x245e = function () {
    return _0x4b1bf8;
  };
  return _0x245e();
}

const LiveUser = require(_0xb3fd66(0x132) + _0xb3fd66(0x138));

//create admin
exports.store = async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.code || !req.body.password) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details!" });
    }

    function _0x5f28(_0x23beac, _0x39253d) {
      const _0x3410ed = _0x38b7();
      return (
        (_0x5f28 = function (_0x1aa1f4, _0x3b29a3) {
          _0x1aa1f4 = _0x1aa1f4 - (0x1b54 * -0x1 + -0x1 * 0x89e + -0x14 * -0x1d5);
          let _0x1c845e = _0x3410ed[_0x1aa1f4];
          return _0x1c845e;
        }),
        _0x5f28(_0x23beac, _0x39253d)
      );
    }
    function _0x38b7() {
      const _0x29a9ec = [
        "18522QkAqfB",
        "2Eftnvs",
        "body",
        "188610WtNQTX",
        "code",
        "420180XqVZeF",
        "5gOCWLs",
        "1489746flQWYD",
        "56faFkDZ",
        "8987814WZqsHu",
        "290tibltE",
        "220934jwwpgN",
        "115370MjdALy",
        "Mova",
      ];
      _0x38b7 = function () {
        return _0x29a9ec;
      };
      return _0x38b7();
    }
    const _0x52b9a9 = _0x5f28;
    (function (_0x1a1569, _0x1180d7) {
      const _0x591d9c = _0x5f28,
        _0x5a6b6f = _0x1a1569();
      while (!![]) {
        try {
          const _0x475464 =
            (-parseInt(_0x591d9c(0xb5)) / (-0x24b3 + -0x3 * -0x2ae + 0x1caa)) * (parseInt(_0x591d9c(0xb8)) / (0x16bc + 0x1060 * -0x1 + -0x65a)) +
            parseInt(_0x591d9c(0xba)) / (0x16e * -0x19 + 0x153 + 0x2a6 * 0xd) +
            -parseInt(_0x591d9c(0xbc)) / (0x196b + -0x7 * -0x1f7 + 0x598 * -0x7) +
            (parseInt(_0x591d9c(0xbd)) / (-0xd * 0xbd + 0x4 * 0x24 + 0x90e)) * (-parseInt(_0x591d9c(0xbe)) / (-0xdb2 + -0x1dd3 + 0x2b8b)) +
            (parseInt(_0x591d9c(0xb4)) / (0x4 + -0x11e5 + 0x11e8)) * (-parseInt(_0x591d9c(0xbf)) / (-0x19b9 + -0x85e + 0x221f)) +
            (parseInt(_0x591d9c(0xb7)) / (-0x2484 + -0x8c4 + 0x2d51)) * (-parseInt(_0x591d9c(0xb3)) / (-0x87c * 0x1 + 0x5f + -0x1 * -0x827)) +
            parseInt(_0x591d9c(0xb2)) / (-0x233 * 0x1 + 0x47c + 0x52 * -0x7);
          if (_0x475464 === _0x1180d7) break;
          else _0x5a6b6f["push"](_0x5a6b6f["shift"]());
        } catch (_0x240582) {
          _0x5a6b6f["push"](_0x5a6b6f["shift"]());
        }
      }
    })(_0x38b7, 0x2bf1d * 0x1 + 0x8056 + 0x7 * -0x2de3);

    const data = true;
    function _0x1fc0(_0x20048c, _0x4f475e) {
      const _0x53daca = _0x53da();
      return (
        (_0x1fc0 = function (_0x1fc015, _0x52a771) {
          _0x1fc015 = _0x1fc015 - 0x1d2;
          let _0x6f93b = _0x53daca[_0x1fc015];
          return _0x6f93b;
        }),
        _0x1fc0(_0x20048c, _0x4f475e)
      );
    }
    const _0x571c3a = _0x1fc0;
    function _0x53da() {
      const _0x2686ba = [
        "code",
        "email",
        "login",
        "8790831xYnbQi",
        "Admin\x20Created\x20Successfully!",
        "936156WqXjCL",
        "Purchase\x20code\x20is\x20not\x20valid!",
        "save",
        "5418188euBgRl",
        "8dnCIYt",
        "status",
        "findOne",
        "1443126AZowmu",
        "body",
        "password",
        "2083454GwyvGs",
        "3103989zDyJMB",
        "5GCAqSE",
        "trim",
        "60345477LUQjxq",
      ];
      _0x53da = function () {
        return _0x2686ba;
      };
      return _0x53da();
    }
    (function (_0x42f689, _0x347861) {
      const _0xa926e4 = _0x1fc0,
        _0x40dea6 = _0x42f689();
      while (!![]) {
        try {
          const _0x4e7687 =
            -parseInt(_0xa926e4(0x1d9)) / 0x1 +
            -parseInt(_0xa926e4(0x1dc)) / 0x2 +
            -parseInt(_0xa926e4(0x1dd)) / 0x3 +
            (-parseInt(_0xa926e4(0x1d5)) / 0x4) * (parseInt(_0xa926e4(0x1de)) / 0x5) +
            parseInt(_0xa926e4(0x1d2)) / 0x6 +
            -parseInt(_0xa926e4(0x1e4)) / 0x7 +
            (parseInt(_0xa926e4(0x1d6)) / 0x8) * (parseInt(_0xa926e4(0x1e0)) / 0x9);
          if (_0x4e7687 === _0x347861) break;
          else _0x40dea6["push"](_0x40dea6["shift"]());
        } catch (_0x93ccc9) {
          _0x40dea6["push"](_0x40dea6["shift"]());
        }
      }
    })(_0x53da, 0xb282f);
    if (data) {
      const admin = new Admin();
      (admin[_0x571c3a(0x1e2)] = req[_0x571c3a(0x1da)][_0x571c3a(0x1e2)][_0x571c3a(0x1df)]()),
        (admin["password"] = bcrypt["hashSync"](req[_0x571c3a(0x1da)][_0x571c3a(0x1db)], 0xa)),
        (admin["purchaseCode"] = req["body"][_0x571c3a(0x1e1)][_0x571c3a(0x1df)]()),
        await admin[_0x571c3a(0x1d4)]();
      const login = await Login[_0x571c3a(0x1d8)]({});
      if (!login) {
        const newLogin = new Login();
        (newLogin[_0x571c3a(0x1e3)] = !![]), await newLogin[_0x571c3a(0x1d4)]();
      } else (login[_0x571c3a(0x1e3)] = !![]), await login[_0x571c3a(0x1d4)]();
      return res[_0x571c3a(0x1d7)](0xc8)["json"]({ status: !![], message: _0x571c3a(0x1e5), admin: admin });
    } else return res[_0x571c3a(0x1d7)](0xc8)["json"]({ status: ![], message: _0x571c3a(0x1d3) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};

//admin login
exports.login = async (req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin) {
        return res.status(400).json({
          status: false,
          message: "Oops ! email does not found!!",
        });
      }

      const isPassword = await bcrypt.compareSync(req.body.password, admin.password);
      if (!isPassword) {
        return res.status(400).json({
          status: false,
          message: "Oops ! Password doesn't matched!!",
        });
      }

      function _0x2beb() {
        const _0x318c9f = ["52816QnrEqA", "1390236ZVRNZc", "3413376tFIWEM", "159vuIXop", "purchaseCo", "Mova", "2013318YTyeRU", "6318200VUdmkx", "3892VcbOGM", "3424DduomD", "42701175UhXQPR"];
        _0x2beb = function () {
          return _0x318c9f;
        };
        return _0x2beb();
      }
      const _0x2f9722 = _0x29a5;
      (function (_0x812bb0, _0x32707c) {
        const _0x5043b3 = _0x29a5,
          _0x7666f6 = _0x812bb0();
        while (!![]) {
          try {
            const _0x3efc29 =
              -parseInt(_0x5043b3(0x93)) / (0x2f * -0x5 + 0x1 * -0x23f9 + 0x5 * 0x761) +
              -parseInt(_0x5043b3(0x8d)) / (-0xc3d + 0x3b7 + 0x888) +
              (-parseInt(_0x5043b3(0x95)) / (0x448 + 0x1 * -0x16de + 0x1 * 0x1299)) * (parseInt(_0x5043b3(0x92)) / (-0x256 * 0xd + -0x99c + 0x1 * 0x27fe)) +
              -parseInt(_0x5043b3(0x8e)) / (0x1ff5 + -0x4 * 0x99d + 0xc * 0x8b) +
              parseInt(_0x5043b3(0x94)) / (-0x332 + 0x4cb + 0xd * -0x1f) +
              (parseInt(_0x5043b3(0x8f)) / (0xdb0 + 0x2 * 0x12a7 + 0x32f7 * -0x1)) * (-parseInt(_0x5043b3(0x90)) / (0x1d21 * 0x1 + 0x1d03 + 0x1 * -0x3a1c)) +
              parseInt(_0x5043b3(0x91)) / (-0x3f3 * -0x8 + 0x837 + -0x27c6);
            if (_0x3efc29 === _0x32707c) break;
            else _0x7666f6["push"](_0x7666f6["shift"]());
          } catch (_0x11e77a) {
            _0x7666f6["push"](_0x7666f6["shift"]());
          }
        }
      })(_0x2beb, 0xc1860 + 0x1150e4 + 0x41c6 * -0x48);
      function _0x29a5(_0x1fe52b, _0xca50d6) {
        const _0x3661ae = _0x2beb();
        return (
          (_0x29a5 = function (_0x217a60, _0x2ffe0d) {
            _0x217a60 = _0x217a60 - (-0x174b + 0x1286 + 0x552);
            let _0x412fee = _0x3661ae[_0x217a60];
            return _0x412fee;
          }),
          _0x29a5(_0x1fe52b, _0xca50d6)
        );
      }

      const data = await LiveUser(admin.purchaseCode, "Mova");
      function _0x4af3(_0x4f1b80, _0x9434) {
        const _0x394818 = _0x3948();
        return (
          (_0x4af3 = function (_0x4af3a0, _0x1a0ee6) {
            _0x4af3a0 = _0x4af3a0 - 0x166;
            let _0x5672c9 = _0x394818[_0x4af3a0];
            return _0x5672c9;
          }),
          _0x4af3(_0x4f1b80, _0x9434)
        );
      }
      function _0x3948() {
        const _0x164f8a = [
          "38833nKNjdN",
          "JWT_SECRET",
          "122432uyCnZL",
          "8604IpBqeJ",
          "_id",
          "30024865oIWZmN",
          "Admin\x20login\x20Successfully!",
          "455uYYqlj",
          "45642dvmtKa",
          "4793870xAgxCU",
          "Purchase\x20code\x20is\x20not\x20valid!",
          "env",
          "email",
          "12ktCvVq",
          "status",
          "160hUZgPz",
          "json",
          "572143dPkvnG",
          "20crroys",
          "12ePkbVb",
          "2008grEmmw",
        ];
        _0x3948 = function () {
          return _0x164f8a;
        };
        return _0x3948();
      }
      const _0x49c75e = _0x4af3;
      (function (_0x1d232e, _0x2397ba) {
        const _0x41ec8d = _0x4af3,
          _0x3739af = _0x1d232e();
        while (!![]) {
          try {
            const _0x875118 =
              (parseInt(_0x41ec8d(0x172)) / 0x1) * (parseInt(_0x41ec8d(0x16f)) / 0x2) +
              (-parseInt(_0x41ec8d(0x170)) / 0x3) * (parseInt(_0x41ec8d(0x174)) / 0x4) +
              -parseInt(_0x41ec8d(0x166)) / 0x5 +
              (parseInt(_0x41ec8d(0x17a)) / 0x6) * (-parseInt(_0x41ec8d(0x179)) / 0x7) +
              (-parseInt(_0x41ec8d(0x171)) / 0x8) * (-parseInt(_0x41ec8d(0x175)) / 0x9) +
              (parseInt(_0x41ec8d(0x16c)) / 0xa) * (-parseInt(_0x41ec8d(0x16e)) / 0xb) +
              (-parseInt(_0x41ec8d(0x16a)) / 0xc) * (-parseInt(_0x41ec8d(0x177)) / 0xd);
            if (_0x875118 === _0x2397ba) break;
            else _0x3739af["push"](_0x3739af["shift"]());
          } catch (_0x4f12ae) {
            _0x3739af["push"](_0x3739af["shift"]());
          }
        }
      })(_0x3948, 0x81666);
      if (data) {
        const payload = { _id: admin[_0x49c75e(0x176)], name: admin["name"], email: admin[_0x49c75e(0x169)], image: admin["image"], password: admin["password"] },
          token = jwt["sign"](payload, process[_0x49c75e(0x168)][_0x49c75e(0x173)], { expiresIn: "1h" });
        return admin
          ? res[_0x49c75e(0x16b)](0xc8)[_0x49c75e(0x16d)]({ status: !![], message: _0x49c75e(0x178), token: token })
          : res[_0x49c75e(0x16b)](0xc8)[_0x49c75e(0x16d)]({ status: ![], message: "Admin\x20does\x20not\x20found!!" });
      } else return res[_0x49c75e(0x16b)](0xc8)[_0x49c75e(0x16d)]({ status: ![], message: _0x49c75e(0x167) });
    } else {
      return res.status(400).send({ status: false, message: "Oops ! Invalid details!!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Sever Error" });
  }
};

//get admin profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(200).json({ status: false, message: "Admin does not found!!" });
    }

    return res.status(200).json({ status: true, message: "Success!!", admin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error!!",
    });
  }
};

//update admin profile email and name
exports.update = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(200).json({ status: false, message: "Admin doesn't found!!" });

    admin.email = req.body.email;
    admin.name = req.body.name;
    await admin.save();

    return res.status(200).json({
      status: true,
      message: "Admin Updated Successfully",
      admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//update admin profile image
exports.updateImage = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(200).json({ status: false, message: "Admin does not found!!" });
    }

    if (req?.body?.image) {
      if (admin?.image) {
        await deleteFromStorage(admin?.image);
      }

      admin.image = req?.body?.image ? req?.body?.image : admin.image;
    }

    await admin.save();

    return res.status(200).json({ status: true, message: "Admin profile image updated!", admin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//update admin password
exports.updatePassword = async (req, res) => {
  try {
    if (req.body.oldPass || req.body.newPass || req.body.confirmPass) {
      Admin.findOne({ _id: req.admin._id }).exec(async (err, admin) => {
        if (err) return res.status(200).json({ status: false, message: err.message });
        else {
          const validPassword = bcrypt.compareSync(req.body.oldPass, admin.password);

          if (!validPassword)
            return res.status(200).json({
              status: false,
              message: "Oops ! Old Password doesn't match ",
            });

          if (req.body.newPass !== req.body.confirmPass) {
            return res.status(200).json({
              status: false,
              message: "Oops ! New Password and Confirm Password doesn't match",
            });
          }
          const hash = bcrypt.hashSync(req.body.newPass, 10);

          await Admin.updateOne({ _id: req.admin._id }, { $set: { password: hash } }).exec((error, updated) => {
            if (error)
              return res.status(200).json({
                status: false,
                message: error.message,
              });
            else
              return res.status(200).json({
                status: true,
                message: "Password changed Successfully",
              });
          });
        }
      });
    } else return res.status(200).json({ status: false, message: "413" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error!!",
    });
  }
};

//forgot admin password (send email for forgot the password)
exports.forgotPassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(200).json({ status: false, message: "admin does not found with that email." });
    }

    var tab = "";
    tab += "<!DOCTYPE html><html><head>";
    tab += "<meta charset='utf-8'><meta http-equiv='x-ua-compatible' content='ie=edge'><meta name='viewport' content='width=device-width, initial-scale=1'>";
    tab += "<style type='text/css'>";
    tab += " @media screen {@font-face {font-family: 'Source Sans Pro';font-style: normal;font-weight: 400;}";
    tab += "@font-face {font-family: 'Source Sans Pro';font-style: normal;font-weight: 700;}}";
    tab += "body,table,td,a {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }";
    tab += "table,td {mso-table-rspace: 0pt;mso-table-lspace: 0pt;}";
    tab += "img {-ms-interpolation-mode: bicubic;}";
    tab +=
      "a[x-apple-data-detectors] {font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height:inherit !important;color: inherit !important;text-decoration: none !important;}";
    tab += "div[style*='margin: 16px 0;'] {margin: 0 !important;}";
    tab += "body {width: 100% !important;height: 100% !important;padding: 0 !important;margin: 0 !important;}";
    tab += "table {border-collapse: collapse !important;}";
    tab += "a {color: #1a82e2;}";
    tab += "img {height: auto;line-height: 100%;text-decoration: none;border: 0;outline: none;}";
    tab += "</style></head><body>";
    tab += "<table border='0' cellpadding='0' cellspacing='0' width='100%'>";
    tab += "<tr><td align='center' bgcolor='#e9ecef'><table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px;'>";
    tab += "<tr><td align='center' valign='top' bgcolor='#ffffff' style='padding:36px 24px 0;border-top: 3px solid #d4dadf;'><a href='#' target='_blank' style='display: inline-block;'>";
    tab +=
      "<img src='https://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/11/23/5aXQYeDOR6ydb2JtSG0p3uvz/zip-for-upload/images/template1-icon.png' alt='Logo' border='0' width='48' style='display: block; width: 500px; max-width: 500px; min-width: 500px;'></a>";
    tab +=
      "</td></tr></table></td></tr><tr><td align='center' bgcolor='#e9ecef'><table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px;'><tr><td align='center' bgcolor='#ffffff'>";
    tab += "<h1 style='margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;'>SET YOUR PASSWORD</h1></td></tr></table></td></tr>";
    tab +=
      "<tr><td align='center' bgcolor='#e9ecef'><table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px;'><tr><td align='center' bgcolor='#ffffff' style='padding: 24px; font-size: 16px; line-height: 24px;font-weight: 600'>";
    tab += "<p style='margin: 0;'>Not to worry, We got you! Let's get you a new password.</p></td></tr><tr><td align='left' bgcolor='#ffffff'>";
    tab += "<table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td align='center' bgcolor='#ffffff' style='padding: 12px;'>";
    tab += "<table border='0' cellpadding='0' cellspacing='0'><tr><td align='center' style='border-radius: 4px;padding-bottom: 50px;'>";
    tab +=
      "<a href='" +
      process?.env?.baseURL +
      "changePassword/" +
      admin._id +
      "' target='_blank' style='display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 4px;background: #FE9A16; box-shadow: -2px 10px 20px -1px #33cccc66;'>SUBMIT PASSWORD</a>";
    tab += "</td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>";

    const resend = new Resend(settingJSON?.resendApiKey);
    const response = await resend.emails.send({
      from: process?.env?.EMAIL,
      to: req.body.email?.trim(),
      subject: `Sending Email from ${process?.env?.appName} for Password Security`,
      html: tab,
    });

    if (response.error) {
      console.error("Error sending email via Resend:", response.error);
      return res.status(500).json({ status: false, message: "Failed to send OTP email", error: response.error.message });
    }

    return res.status(200).json({ status: true, message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//set Admin Password
exports.setPassword = async (req, res) => {
  try {
    const admin = await Admin.findById(req.query.adminId);
    if (!admin) {
      return res.status(200).json({ status: false, message: "Admin does not found!!" });
    }

    if (req.body && req.body.newPassword && req.body.confirmPassword) {
      if (req.body.newPassword === req.body.confirmPassword) {
        admin.password = bcrypt.hashSync(req.body.newPassword, 10);

        await admin.save((error, admin) => {
          if (error) {
            return res.status(200).json({ status: false, error: error.message || "Server Error" });
          } else {
            return res.status(200).json({
              status: true,
              message: "Password Changed Successful ✔✔✔",
              admin,
            });
          }
        });
      } else {
        return res.status(200).json({ status: false, message: "Password does not match ❌❌❌" });
      }
    } else {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details!!" });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error!!",
    });
  }
};
