const { json } = require("express");
const express = require("express");
const fs = require("fs").promises;
const PORT = process.env.PORT || 8007;
const app = express();

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard.ejs"); // homepage.ejs
});

app.post("/create", (req, res) => {
  const user = req.body;   // contains usr input
  //generate random ID
  user.id = Math.floor(Math.random() * 600) + 1;
  fs.readFile("database.json", "utf-8")
    .then((content) => JSON.parse(content))
    .then((jsonObj) => {
        let newJSONobj = jsonObj;
		newJSONobj.users.push(user); // create js object
      	// write 'user' into json object, overwriting the JSON file
		fs.writeFile("database.json", JSON.stringify(newJSONobj))
			.then(() => res.redirect(`/homepage/${user.id}`))
			.catch((err) => console.log(err));
    })
   .catch((err) => console.log(err));
});

app.get("/homepage/:id", (req, res) => {
	const id = Number(req.params.id);
	fs.readFile("database.json", "utf8")
		.then(content => JSON.parse(content).users)
		.then(users => users.find((user) => user.id === id))
		.then(foundUser => {
			return res.render("homepage", {user: foundUser})
		})
		.catch(err => console.log(err)) 
});

/* 
  this is the function where you actually load the homepage
  send variable into ejs page, 
*/
app.get("/homepage/:id", (req, res) => {  
  // get the ID from the URL
  // look at database.json to see if there is a user with that ID
  fs.readFile("database.json", "utf8")
    .then(content => JSON.parse(content).users)
    .then(users => users.find(user => user.id === id))
    .then(foundUser => {
		return res.render("homepage", {user: foundUser})
	})
    //.then(foundUser => res.render("homepage"))
    .catch(err => console.log(err));
})

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});




/*
  NOTES TO BE MOVED

  ejs allows for some special fancy things in html
  don't double click and open ejs files
  if you want to see any page, make sure the page is given to you by 
  express
  bold title name, dont bold author name
*/