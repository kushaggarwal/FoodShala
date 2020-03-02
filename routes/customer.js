const express = require("express");
const session = require("express-session");
const { db, Users, Restaurants, Menus, Orders } = require("../data/db");
const router = require("express").Router();

router.route("/signup").get((req, res) => {
  res.render("signup");
});

router.route("/signup").post(async (req, res) => {
  const user = await Users.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    type: req.body.type
  });
  res.redirect("/login");
});

router.route("/profile").get(async (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }

  const user = await Users.findOne({
    where: {
      username: req.session.username
    }
  });
  console.log(req.session);
  orders = await Orders.findAll({
    attributes: [
      "name",
      "price",
      "Quantity",
      "restaurantUsername",
      "updatedAt"
    ],
    where: {
      userUsername: user.username
    }
  });
  console.log(orders);

  res.render("profile", { user, orders });
});
module.exports = router;
