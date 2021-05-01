const router = require("express").Router();
import jwt from "jsonwebtoken";
import * as bookmark from "../controllers/bookmark.controller";

// MIDDLWARE FOR AUTHORIZATION
// process.env.SECRET_KEY is environment variable stores in .env file and accessed using dotenv package
router.use(function (req, res, next) {
// 	req.headers.authorization = jwt token received
	if (!req.headers.authorization)
		return res.status(401).send({ message: "Access Denied" });
	try {
		jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
	} catch (err) {
		return res.status(400).send({ message: err.message || "Access Denied" });
	}
	next();
});

// CREATES NEW BOOKMARK
router.post("/", bookmark.create);

// RETURNS ALL THE BOOKMARKS
router.get("/", bookmark.findAll);

// RETURNS A BOOKMARK WITH ID
router.get("/:id", bookmark.findOne);

// UPDATES A BOOKMARK WITH ID

router.put("/:id", bookmark.update);

// DELETES A SINGLE BOOKMARK WITH ID

router.delete("/:id", bookmark.deleteOne);

// DELETES ALL THE BOOKMARKS
router.delete("/", bookmark.deleteAll);

export default router;
