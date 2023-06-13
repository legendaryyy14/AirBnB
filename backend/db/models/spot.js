'use strict';
const {
  Model
} = require('sequelize');

const { all } = require('../../routes/api/spots');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: "ownerId"}),
      Spot.hasMany(models.SpotImage, {foreignKey: "spotId"}),
      Spot.belongsToMany(models.User, {
        through: "Bookings",
        foreignKey: "spotId",
        otherKey: "userId"
      }),
      Spot.belongsToMany(models.User, {
        through: "Reviews",
        foreignKey: "spotId",
        otherKey: "userId"
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50]
      }

    },
    description: {
      Type: DataTypes.STRING,
      allowNull: false
      },
    price: {
      Type: DataTypes.DECIMAL,
      allowNull: false
    },
    avgRating: {
      Type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
