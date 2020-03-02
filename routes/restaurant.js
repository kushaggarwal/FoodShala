const express = require("express");
const session = require("express-session");
const { db, Users, Restaurants, Menus, Orders } = require("../data/db");
const router = require("express").Router();

router.route("/signup").get((req, res) => {
  res.render("restaurant");
});

router.route("/signup").post(async (req, res) => {
  const restaurant = await Restaurants.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name
  });
  res.redirect("/login");
});

router.route("/profile").get(async (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }

  const user = await Restaurants.findOne({
    where: {
      username: req.session.username
    }
  });
  console.log(req.session);

  orders = await Orders.findAll({
    attributes: ["name", "price", "Quantity", "userUsername", "updatedAt"],
    where: {
      restaurantUsername: user.username
    }
  });
  console.log(orders);
  res.render("RestaurantProfile", { user, orders });
});

router.route("/additem").post(async (req, res) => {
  const menu = await Menus.create({
    name: req.body.username,
    price: req.body.price,
    type: req.body.type,
    ownerUsername: req.body.owner
  });
  console.log(menu);
});
router.route("/menu/:name").get(async (req, res) => {
  items = await Menus.findAll({
    attributes: ["name", "price", "type"],
    where: {
      ownerUsername: req.params.name
    }
  });

  res.render("menu", { items });
});

module.exports = router;
