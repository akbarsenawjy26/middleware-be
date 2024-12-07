const responseHelper = require("../../../utils/response_utils");
const serviveGetUser = require("../services/read_user_service");
const serviceCreateUser = require("../services/create_user_service");
const serviceDeleteUser = require("../services/delete_user_service");
const serviceUpdateUser = require("../services/update_user_service");

class UserController {
  getUserList = async (req, res) => {
    try {
      const data = await serviveGetUser.getUserList();
      res.status(200).json(responseHelper.success(data, "Success get All data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getUserByGuid = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await serviveGetUser.getUserByGuid(guid);
      res.status(200).json(responseHelper.success(data, `Success get data guid ${guid}`));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  createUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password || !role) {
      res.status(400).json(responseHelper.fail("please complete a field"));
    }

    try {
      const data = await serviceCreateUser.createUser(name, username, email, password, role);
      res.status(200).json(responseHelper.success(data, "Success insert new user"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateUser = async (req, res) => {
    const { guid } = req.params;
    const { name, username, email, password, role } = req.body;

    try {
      const user = await serviveGetUser.getUserByGuid(guid);

      if (!user) {
        res.status(404).json(responseHelper.fail(data, "User not found!"));
      }

      const data = await serviceUpdateUser.updateUser(user.guid, name, username, email, password, role);
      res.status(200).json(responseHelper.success(data, "Success update user"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteUser = async (req, res) => {
    const { guid } = req.params;
    if (!guid) {
      res.status(400).json(responseHelper.fail("please fill the guid"));
    }

    try {
      const data = await serviceDeleteUser.deleteUser(guid);
      res.status(200).json(responseHelper.success(data, "Success delete user"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

// const getUserList = async (req, res) => {
//   try {
//     const data = await serviveGetUser.getUserList();
//     res.status(200).json(responseHelper.success(data, "Success get All data"));
//   } catch (error) {
//     res.status(500).json(responseHelper.error(error.message));
//   }
// };

// const getUserByGuid = async (req, res) => {
//   const { guid } = req.params;

//   try {
//     const data = await serviveGetUser.getUserByGuid(guid);
//     res.status(200).json(responseHelper.success(data, `Success get data guid ${guid}`));
//   } catch (error) {
//     res.status(500).json(responseHelper.error(error.message));
//   }
// };

// const createUser = async (req, res) => {
//   const { name, username, email, password, role } = req.body;

//   if (!name || !username || !email || !password || !role) {
//     res.status(400).json(responseHelper.fail("please complete a field"));
//   }

//   try {
//     const data = await serviceCreateUser.createUser(name, username, email, password, role);
//     res.status(200).json(responseHelper.success(data, "Success insert new user"));
//   } catch (error) {
//     res.status(500).json(responseHelper.error(error.message));
//   }
// };

// const updateUser = async (req, res) => {
//   const { guid } = req.params;
//   const { name, username, email, password, role } = req.body;

//   try {
//     const user = await serviveGetUser.getUserByGuid(guid);

//     if (!user) {
//       res.status(404).json(responseHelper.fail(data, "User not found!"));
//     }

//     const data = await serviceUpdateUser.updateUser(user.guid, name, username, email, password, role);
//     res.status(200).json(responseHelper.success(data, "Success update user"));
//   } catch (error) {
//     res.status(500).json(responseHelper.error(error.message));
//   }
// };

// const deleteUser = async (req, res) => {
//   const { guid } = req.params;
//   if (!guid) {
//     res.status(400).json(responseHelper.fail("please fill the guid"));
//   }

//   try {
//     const data = await serviceDeleteUser.deleteUser(guid);
//     res.status(200).json(responseHelper.success(data, "Success delete user"));
//   } catch (error) {
//     res.status(500).json(responseHelper.error(error.message));
//   }
// };

// module.exports = {
//   getUserList,
//   getUserByGuid,
//   createUser,
//   updateUser,
//   deleteUser,
// };

module.exports = new UserController();
