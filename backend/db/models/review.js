'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {foreignKey: "reviewId", hooks: true})
      Review.belongsTo(models.Spot, {foreignKey: "spotId", hooks: true}),
      Review.belongsTo(models.User, {foreignKey: "userId", hooks: true})
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
