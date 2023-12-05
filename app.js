const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/crudproject");
let db = mongoose.connection;

db.once("open", () => {
  console.log("connected to mongo db");
});

db.on("error", (err) => {
  console.log(err);
});

const app = express();
let User = require("./modles/User");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user/add", (req, res) => {
  res.render("add-user");
});

app.get("/user/view", (req, res) => {
  User.find({})
    .then((users) => {
      res.render("view-users-data", {
        users: users,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/update", (req, res) => {
  User.find({})
    .then((users) => {
      res.render("update-user", {
        users: users,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user/add", (req, res) => {
  let user = new User();
  user.lastName = req.body.lastName;
  user.firstName = req.body.firstName;
  user.dateOfBirth = req.body.dateOfBirth;
  user.address1 = req.body.address1;
  user.address2 = req.body.address2;
  user.city = req.body.city;
  user.postalCode = req.body.postalCode;
  user.country = req.body.country;
  user.phoneNumber = req.body.phoneNumber;
  user.email = req.body.email;
  user.notes = req.body.notes;
  user
    .save()
    .then((result) => {
      res.redirect("/user/view");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("edit-user", { user: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user/edit/:id", (req, res) => {
  let updateData = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    dateOfBirth: req.body.dateOfBirth,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    notes: req.body.notes,
  };

  User.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((result) => {
      res.redirect("/user/view");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting user");
    });
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
