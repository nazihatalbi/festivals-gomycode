const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const nodemailer = require("nodemailer");

const User = require("../models/User");

router.post("/register", function(req, res) {
	const { errors, isValid } = validateRegisterInput(req.body);
	console.log("hi", req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			return res.status(400).json({
				email: "Email already exists"
			});
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: "200",
				r: "pg",
				d: "mm"
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				confirmPassword: req.body.confirmPassword,
				password: req.body.password,
				avatar
			});

			bcrypt.genSalt(10, (err, salt) => {
				if (err) console.error("There was an error", err);
				else {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) console.error("There was an error", err);
						else {
							newUser.password = hash;
							newUser.save().then(user => {
								res.json(user);
							});
						}
					});
				}
			});
		}
	});
});

router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = "User not found";
			return res.status(404).json(errors);
		}
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};
				jwt.sign(
					payload,
					"secret",
					{
						expiresIn: 3600
					},
					(err, token) => {
						if (err) console.error("There is some error in token", err);
						else {
							res.json({
								success: true,
								token: `Bearer ${token}`
							});
						}
					}
				);
			} else {
				errors.password = "Incorrect Password";
				return res.status(400).json(errors);
			}
		});
	});
});

// router.post("/reservation", function(req, res) {
// 	const { errors, isValid } = validateRegisterInput(req.body);
// 	console.log(req.body);
// 	if (!isValid) {
// 		return res.status(400).json(errors);
// 	}
// 	User.findOne({
// 		email: req.body.email
// 	}).then(user => {
// 		if (user) {
// 			return res.status(400).json({
// 				email: "Email already exists"
// 			});
// 		} else {
// 			const avatar = gravatar.url(req.body.email, {
// 				s: "200",
// 				r: "pg",
// 				d: "mm"
// 			});
// 			const newUser = new User({
// 				name: req.body.name,
// 				email: req.body.email,
// 				confirmPassword: req.body.confirmPassword,
// 				password: req.body.password,
// 				avatar
// 			});

// 			bcrypt.genSalt(10, (err, salt) => {
// 				if (err) console.error("There was an error", err);
// 				else {
// 					bcrypt.hash(newUser.password, salt, (err, hash) => {
// 						if (err) console.error("There was an error", err);
// 						else {
// 							newUser.password = hash;
// 							newUser.save().then(user => {
// 								res.json(user);
// 							});
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});
// });
// router.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
// 	return res.json({
// 		id: req.user.id,
// 		name: req.user.name,
// 		email: req.user.email
// 	});
// });
router.get("/sendmail", (req, res) => {
	// consosendmaille.log("alooooo");
	console.log(req, "req");
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "nazihatalbi@gmail.com",
			pass: "sadoura19"
		}
	});

	var mailOptions = {
		from: "nazihatalbi@gmail.com",
		to: req.body.email,
		subject: req.body.subject,
		text: req.body.text
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
});

module.exports = router;
