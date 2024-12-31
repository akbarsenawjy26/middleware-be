const { sequelize } = require("../models");

class dbExtraFunction {
  constructor(sequelize) {
    this.sequelize = sequelize;
  }
  runTransaction = async (txFunction) => {
    const t = await this.sequelize.transaction();

    try {
      const result = await txFunction(t);
      await t.commit();

      return result;
    } catch (error) {
      await t.rollback();
      throw err;
    }
  };
}
module.exports = new dbExtraFunction(sequelize);
