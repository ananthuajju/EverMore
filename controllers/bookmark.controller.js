import Bookmark from "../models/bookmark.model";
import urlhandler from "./urlhandler";

// CREATES NEW BOOKMARK
exports.create = async (req, res) => {
	if (!req.body.url) {
		res.status(400).send({ message: "url cannot be empty" });
	}
	// URLHANDLER RETURNS - VALIDATES AND SENDS META DATA OF THE URL
	console.log(req.body);
	const data = await urlhandler(req.body.url);
	if (data === false) {
		res.status(400).send({ message: "not a valid URL" });
		return "not a valid URL";
	}
// 	CREATE NEW BOOKMARK FROM BOOKMARK SCHEMA
	const bookmark = new Bookmark({
		userId: req.body.userid,
		url: data.url,
		title: data.title,
		description: data.description,
		date: Date.now(),
	});
// 	SAVE IT TO MONGODB
	bookmark
		.save(bookmark)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occured while creating the bookmark",
			});
		});
};

// RETURNS A BOOKMARK BY ID

exports.findOne = async (req, res) => {
	const id = req.params.id;
	try {
		const bookmark = await Bookmark.findById(id);
		// CHECK WHETHER THE BOOKMARK BELONGS TO THE USER
		if (bookmark.userId !== req.body.userid) {
			return res.status(400).send("Access Denied, not your bookmark");
		}
		res.send(bookmark);
	} catch (err) {
		res.status(500).send({ message: err.message || "Something went wrong" });
	}
};

// RETURNS ALL THE BOOKMARKS
// RETURNS BOOKMARKS THAT MATCHES THE TITLE IF PROVIDED

exports.findAll = async (req, res) => {
	const title = req.query.title;
	const userid = req.body.userid;
	const condition = title
		? { userId: userid, title: { $regex: new RegExp(title), $options: "i" } }
		: { userId: userid };
	try {
		const bookmarks = await Bookmark.find(condition);
		console.log(bookmarks);
		res.send(bookmarks);
	} catch (err) {
		res.status(500).send({ message: err.message || "Something went wrong" });
	}
};

// UPDATES A BOOKMARK BY ID

exports.update = async (req, res) => {
	const bookmark = req.body.bookmark;
	if (!bookmark) {
		return res.status(400).send({ message: "bookmark data cannot be empty" });
	}
	const id = req.params.id;
	try {
		// CHECK WHETHER THE BOOKMARK BELONGS TO THE USER
		const bookmarkExist = await Bookmark.findById(id);
		if (bookmarkExist.userId !== req.body.userid) {
			return res.status(400).send("Access Denied, not your bookmark");
		}
		const data = await Bookmark.findByIdAndUpdate(id, bookmark);
		if (!data) {
			res.status(404).send({ message: `Cannot update bookmark with id ${id}` });
		} else {
			// BOOKMARK IS UPDATED
			// BUT CONSOLES VALUES BEFORE UPDATION
			res.send({ message: "bookmark updated successfully" });
		}
	} catch (err) {
		res.status(500).send({ message: err.message || "Something went wrong" });
	}
};


// DELETES A BOOKMARK

exports.deleteOne = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	try {
		// CHECK WHETHER THE BOOKMARK BELONGS TO THE USER
		const bookmark = await Bookmark.findById(id);
		if (bookmark.userId !== req.body.userid) {
			return res.status(400).send("Access Denied, not your bookmark");
		}
		const data = await Bookmark.findByIdAndRemove(id);
		if (!data) {
			res.status(404).send({
				message: `cannot delete bookmark with ${id}, Maybe it is not found`,
			});
		} else {
			res.send({
				message: "Bookmark was deleted successfully",
			});
		}
	} catch (err) {
		res.status(500).send({ message: err.message || "Something went wrong" });
	}
};

// DELETES ALL THE BOOKMARKS

exports.deleteAll = async (req, res) => {
	try {
		const counts = await Bookmark.deleteMany({userId: req.body.userid});
		res.send({
			message: `${counts.deletedCount} bookmarks were deleted successfully`,
		});
	} catch (err) {
		res.status(500).send({ message: err.message || "Something went wrong" });
	}
};
