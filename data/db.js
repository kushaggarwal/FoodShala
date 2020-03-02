const Seqeulize = require("sequelize");

const db = new Seqeulize({
  dialect: "mysql",
  database: "foodshala",
  username: "fooduser",
  password: "foodpass"
});

const Users = db.define("user", {
  username: {
    type: Seqeulize.STRING(30),
    primaryKey: true
  },
  email: {
    type: Seqeulize.STRING(75),
    allowNull: false,
    unique: true
  },
  name: {
    type: Seqeulize.STRING
  },
  password: {
    type: Seqeulize.STRING,
    allowNull: false
  },
  type: {
    type: Seqeulize.STRING,
    allowNull: false
  }
});

const Restaurants = db.define("restaurant", {
  username: {
    type: Seqeulize.STRING(30),
    primaryKey: true
  },
  email: {
    type: Seqeulize.STRING(75),
    allowNull: false,
    unique: true
  },
  name: {
    type: Seqeulize.STRING
  },
  password: {
    type: Seqeulize.STRING,
    allowNull: false
  }
});

const Menus = db.define("menu", {
  name: {
    type: Seqeulize.STRING(30),
    primaryKey: true,
    unique: true
  },
  price: {
    type: Seqeulize.STRING(75),
    allowNull: false
  },

  type: {
    type: Seqeulize.STRING,
    allowNull: false
  },
  ownerUsername: {
    type: Seqeulize.STRING
  }
});

Menus.belongsTo(Restaurants, { as: "owner" });

module.exports = {
  db,
  Users,
  Restaurants,
  Menus
};
