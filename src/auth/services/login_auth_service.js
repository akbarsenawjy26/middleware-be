const serviceGetUser = require("../../user/services/read_user_service");
const argon = require("argon2");

const userAuth = async (email, password) => {
  try {
    const user = await serviceGetUser.getUserByEmail(email);
    if (!user) {
      return { success: false, message: "user not found" };
    }
    const match = await argon.verify(user.password, password);
    if (!match) {
      return { success: false, message: "invlaid password" };
    }

    return { success: true, message: { guid: user.guid, name: user.name, email: user.email, role: user.role } };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

const authSession = async (sessionGuid) => {
  const user = await serviceGetUser.getUserBySessionGuid(sessionGuid);
  if (!user) {
    return { success: false, message: "user not found" };
  }
  return { success: true, user };
};

const roleVerify = async (sessionGuid) => {
  const user = await serviceGetUser.getUserBySessionGuid(sessionGuid);
  if (!user) {
    return { success: false, message: "user not found" };
  }
  return user.role;
};
module.exports = { userAuth, authSession, roleVerify };
