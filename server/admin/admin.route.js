const _0x3dd97e = _0x5d08;
(function (_0x17312a, _0x377e55) {
  const _0xf7185c = _0x5d08,
    _0xf795d9 = _0x17312a();
  while (!![]) {
    try {
      const _0x298af0 =
        -parseInt(_0xf7185c(0x103)) / 0x1 +
        parseInt(_0xf7185c(0x106)) / 0x2 +
        -parseInt(_0xf7185c(0x11c)) / 0x3 +
        (-parseInt(_0xf7185c(0x110)) / 0x4) * (parseInt(_0xf7185c(0x118)) / 0x5) +
        (-parseInt(_0xf7185c(0x11a)) / 0x6) * (-parseInt(_0xf7185c(0x10f)) / 0x7) +
        parseInt(_0xf7185c(0x108)) / 0x8 +
        parseInt(_0xf7185c(0x11b)) / 0x9;
      if (_0x298af0 === _0x377e55) break;
      else _0xf795d9["push"](_0xf795d9["shift"]());
    } catch (_0x1a073b) {
      _0xf795d9["push"](_0xf795d9["shift"]());
    }
  }
})(_0x42b7, 0x5051c);
function _0x5d08(_0x3132c6, _0x9c9c7b) {
  const _0x42b7e7 = _0x42b7();
  return (
    (_0x5d08 = function (_0x5d089f, _0x59361b) {
      _0x5d089f = _0x5d089f - 0x102;
      let _0x40ff43 = _0x42b7e7[_0x5d089f];
      return _0x40ff43;
    }),
    _0x5d08(_0x3132c6, _0x9c9c7b)
  );
}
const express = require(_0x3dd97e(0x105)),
  route = express[_0x3dd97e(0x115)](),
  AdminMiddleware = require(_0x3dd97e(0x111)),
  AdminController = require(_0x3dd97e(0x116));
function _0x42b7() {
  const _0x3aecd4 = [
    "2619556fwbjId",
    "../middleware/admin.middleware",
    "/updatePassword",
    "post",
    "login",
    "Router",
    "./admin.controller",
    "exports",
    "5fwfDSm",
    "/create",
    "414QnxZsB",
    "636093XyFKtc",
    "130902crVdil",
    "/forgetPassword",
    "463708qAeLdE",
    "store",
    "express",
    "1164840qxXytb",
    "update",
    "5201880FniBZV",
    "/setPassword",
    "get",
    "getProfile",
    "/profile",
    "patch",
    "updateImage",
    "19061ECcypP",
  ];
  _0x42b7 = function () {
    return _0x3aecd4;
  };
  return _0x42b7();
}
route[_0x3dd97e(0x113)](_0x3dd97e(0x119), AdminController[_0x3dd97e(0x104)]),
  route["post"]("/login", AdminController[_0x3dd97e(0x114)]),
  route[_0x3dd97e(0x10a)](_0x3dd97e(0x10c), AdminMiddleware, AdminController[_0x3dd97e(0x10b)]),
  route[_0x3dd97e(0x10d)]("/", AdminMiddleware, AdminController[_0x3dd97e(0x107)]),
  route[_0x3dd97e(0x10d)]("/updateImage", AdminMiddleware, AdminController[_0x3dd97e(0x10e)]),
  route["put"](_0x3dd97e(0x112), AdminMiddleware, AdminController["updatePassword"]),
  route["post"](_0x3dd97e(0x102), AdminController["forgotPassword"]),
  route[_0x3dd97e(0x113)](_0x3dd97e(0x109), AdminController["setPassword"]),
  (module[_0x3dd97e(0x117)] = route);
