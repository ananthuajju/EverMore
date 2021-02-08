import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bookmarks from "./routes/bookmark.routes";
import mongoose from "mongoose";
import users from "./routes/user.routes";

dotenv.config();

// CORS CONFIG
const corsOptions = {
	origin: "*",
};

const app = express();

// MIDDLEWARES

app.use(cors(corsOptions));
app.use(express.json());
app.use("/bookmark", bookmarks);
app.use("/user", users);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE CONNECTION
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected to the database");
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
	res.send("plain get	");
});

app.post("/", (req, res) => {
	console.log(req);
	res.send(req.body);
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT} `);
});
