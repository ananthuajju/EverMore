import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import validate from "./validatebody";


// CREATES A NEW USER
exports.register = async (req, res) => {
	// VALIDATE FIRST
	if (!req.body) {
		return res.status(400).send({ message: "Request body is empty" });
	}
// 	VALIDATES ENTERED DATA AND THROWS ERROR IF NOT SATISIED
	const data = validate({ name: req.body.name, email: req.body.email });
	if (data.error) {
		return res.status(400).send({ message: data.error.details[0].message });
	}

	// HASH THE PASSWORD
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// CREATE USER
	// CHECK IF EMAIL ALREADY EXISTS
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res.status(400).send({ message: "This Email is already in use." });
	}
	// CREATE USER
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});
	try {
		const data = await user.save(user);
		if (!data) {
			return res.status(404).send({ message: "cannot create user" });
		}
		res.send("User created successfully");
	} catch (err) {
		res.status(500).send({ message: err.message || "Something went wrong" });
	}
};

// LOGINS THE USER RETURNING A JWT TOKEN AND USER ID
exports.login = async (req, res) => {
	const emailExist = await User.findOne({ email: req.body.email });
	if (!emailExist)
		return res.status(400).send({ message: "Email or Password is Incorrect" });
	const validPass = await bcrypt.compare(
		req.body.password,
		emailExist.password
	);
	if (!validPass) return res.status(400).send("Email or Password is incorrect");
	const token = jwt.sign({ id: emailExist._id }, process.env.SECRET_KEY);
	const userId = emailExist.id
	res.json({token, userId})
};
