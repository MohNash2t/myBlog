const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const PORT = process.env.PORT || 3000;
let posts = [];

const homeStartingContent =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum luctus est, et imperdiet nulla sollicitudin in. Suspendisse varius dolor nec enim interdum elementum. Integer consectetur non nibh in malesuada. Duis vel nunc ut est elementum tincidunt sed ac odio. Fusce tincidunt eleifend metus nec suscipit. Cras commodo at eros in bibendum. Vivamus nec magna ante. Nam mollis semper dui, vitae auctor augue sodales quis. Donec nec euismod nisl, nec porta sapien.";
const aboutContent =
	"Maecenas lacinia sapien maximus, venenatis lacus eu, viverra leo. Sed facilisis purus ultricies dictum ornare. Fusce venenatis eu arcu sed maximus. Aliquam erat volutpat. Integer augue nisi, ultricies eget urna vitae, posuere accumsan tortor. Vestibulum eu eleifend libero. Duis dignissim suscipit aliquet. Ut tincidunt nunc facilisis finibus gravida. Etiam sollicitudin semper pulvinar. Sed eu dolor id sapien dignissim egestas. Integer nunc nisl, rutrum ut nulla sagittis, lacinia finibus ipsum. Phasellus pretium mollis nunc in semper. Suspendisse vitae sem elementum, ornare erat eget, vestibulum mi. Ut dapibus aliquet orci id elementum. Suspendisse euismod at dolor sit amet aliquet. In a feugiat tortor.";
const contactContent =
	"Maecenas auctor, ante id pharetra rutrum, magna turpis blandit lectus, sed aliquam eros massa et libero. Nullam vitae accumsan nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum efficitur leo vestibulum lorem egestas tempor. Etiam in commodo elit, ac congue ex. Nullam et lorem sit amet mauris mollis dapibus vel sit amet mauris. Aliquam commodo tristique lorem, vitae sagittis dui ornare non. Quisque efficitur tortor nisl, nec vulputate tellus fermentum nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse lobortis cursus velit eget pulvinar.";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("^/$|/home", (req, res) => {
	res.render("home", {
		homeStartingContent: homeStartingContent,
		posts: posts,

	});
});

app.get("/posts/:postName", (req, res) => {
	const postName = _.lowerCase(req.params.postName);
	posts.forEach((e) => {
        const storedTitle = _.lowerCase(e.title)

		if (postName === storedTitle) {
			res.render("post", {
				title: e.title,
				content: e.textPost,

			});
		}
	});
});

app.get("/about", (req, res) => {
	res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
	res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
	res.render("compose");
});

app.post("/compose", (req, res) => {
	let post = {
		title: req.body.title,
		textPost: req.body.post,
	};
	posts.push(post);
	res.redirect("/");
});

app.listen(PORT, () => {
	console.log("this server is running on port 3000");
});
