import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        date: Sequelize.INTEGER,
        price: Sequelize.REAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Plan;
