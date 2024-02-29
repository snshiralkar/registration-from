const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Register = require("./models/registers");
// app.get("/", (req, res) => {
//   res.render("index");
// });
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/index", async (req, res) => {
  try {
    // console.log(req.body.phone);
    // re.send(req.body.fullname);
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const resgisterEmployee = new Register({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        gender: req.body.gender,
      });

      const registered = await resgisterEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//login check

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email });

    // const isMatch = await bcrypt.compare(password, useremail.password);

    // console.log(useremail.password);
    if (useremail.email === email) {
      res.status(201).render("index");
    } else {
      re.send("password are not matching");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`connection succussful at port ${port}`);
});
