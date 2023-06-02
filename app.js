// const express = require("express");
// // const bodyParser = require("body-parser");
// const fs = require("fs");
// const http = require("http");
// const hostname = "127.0.0.1";
// const port = 5000;

// const app = express();
// // app.use(bodyParser.json());

// // const sendMail = require("./sendMail");

// fs.readFile("index.html", (err, html) => {
//   if (err) {
//     throw err;
//   }
//   const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-type", "text/html");
//     res.write(html);
//     res.end();
//   });

//   server.listen(port, hostname, () => {
//     console.log(`Server started on port ` + port);
//   });
// });

// // In-memory database
// // let items = [
// //   { id: 1, name: "Item 1", description: "Description 1" },
// //   { id: 2, name: "Item 2", description: "Description 2" },
// // ];

// // Create operation
// // app.post("/items", (req, res) => {
// //   const newItem = req.body;
// //   items.push(newItem);
// //   res.status(201).json(newItem);
// // });

// // Read operation
// // app.get("/items", (req, res) => {
// //   res.json(items);
// // });

// // app.get("/", (req, res) => {
// //   res.send("I am Husnain Arshad");
// // });

// // app.get("/send", sendMail);

// // Update operation
// // app.put("/items/:id", (req, res) => {
// //   const itemId = req.params.id;
// //   const updatedItem = req.body;
// //   items[itemId] = updatedItem;
// //   res.json(updatedItem);
// // });

// // Delete operation
// // app.delete("/items/:id", (req, res) => {
// //   const itemId = req.params.id;
// //   console.log(itemId);
// //   const a = items.filter(
// //     (item, index) => item.id.toString() !== itemId.toString()
// //   );
// //   return res.json({
// //     data: a,
// //   });
// // });

// // let PORT = 5000;
// // const start = () => {
// //   try {
// //     // Start the server
// //     app.listen(PORT, () => {
// //       console.log(`Server started on port ${PORT}`);
// //     });
// //   } catch (error) {}
// // };

// // start();

const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

let tasks = [];
let taskId = 1;

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/add", (req, res) => {
  const { task } = req.body;
  tasks.push({ id: taskId++, name: task });
  res.redirect("/");
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
