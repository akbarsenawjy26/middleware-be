const responseHelper = require("../../../utils/response_utils");
const loginService = require("../services/login_auth_service");

class AuthController {
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await loginService.userAuth(email, password);

      if (!result.success) {
        return res.status(400).json(responseHelper.fail(null, result.message));
      }

      req.session.userGuid = result.message.guid;

      return res.status(200).json(responseHelper.success(result.message, "Login successful!"));
    } catch (error) {
      return res.status(500).json(responseHelper.fail(null, "Internal server error"));
    }
  };

  sessionCheck = async (req, res) => {
    try {
      if (!req.session.userGuid) {
        return res.status(500).json(responseHelper.fail(null, "Please login first"));
      }

      const result = await loginService.authSession(req.session.userGuid);
      if (!result.success) {
        return res.status(404).json(responseHelper.fail(null, result.message));
      }
      res.status(200).json(responseHelper.success(result.user, "You're logined"));
    } catch (error) {
      return res.status(500).json(responseHelper.fail(null, "Internal server error"));
    }
  };

  logout = async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ msg: "Tidak dapat logout" });
      }

      // Hapus cookie sesi setelah sesi dihancurkan
      res.clearCookie("connect.sid", {
        httpOnly: true,
        sameSite: "strict",
      });

      // Kirimkan response sukses logout
      return res.status(200).json({ msg: "Anda telah logout" });
    });
  };
}

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await loginService.userAuth(email, password);

//     if (!result.success) {
//       return res.status(400).json(responseHelper.fail(null, result.message));
//     }

//     req.session.userGuid = result.message.guid;

//     return res.status(200).json(responseHelper.success(result.message, "Login successful!"));
//   } catch (error) {
//     return res.status(500).json(responseHelper.fail(null, "Internal server error"));
//   }
// };

// const sessionCheck = async (req, res) => {
//   try {
//     if (!req.session.userGuid) {
//       return res.status(500).json(responseHelper.fail(null, "Please login first"));
//     }

//     const result = await loginService.authSession(req.session.userGuid);
//     if (!result.success) {
//       return res.status(404).json(responseHelper.fail(null, result.message));
//     }
//     res.status(200).json(responseHelper.success(result.user, "You're logined"));
//   } catch (error) {
//     return res.status(500).json(responseHelper.fail(null, "Internal server error"));
//   }
// };

// const logout = async (req, res) => {
//   req.session.destroy((error) => {
//     if (error) {
//       return res.status(500).json({ msg: "Tidak dapat logout" });
//     }

//     // Hapus cookie sesi setelah sesi dihancurkan
//     res.clearCookie("connect.sid", {
//       httpOnly: true,
//       sameSite: "strict",
//     });

//     // Kirimkan response sukses logout
//     return res.status(200).json({ msg: "Anda telah logout" });
//   });
// };

// module.exports = {
//   login,
//   logout,
//   sessionCheck,
// };

module.exports = new AuthController();
