const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const comments = [
    {
        id: uuidv4(),
        username: "Alexa",
        desc: "Hallo aku Alexa, dari bandung"
    },
    {
        id: uuidv4(),
        username: "Budi",
        desc: "Hallo aku Budi, dari kalimantan  utara"
    },
    {
        id: uuidv4(),
        username: "Michael",
        desc: "Hi there, i'm Michael from california"
    },
    {
        id: uuidv4(),
        username: "Popo",
        desc: "Hallo aku Popo, dari Jakarta"
    },
    {
        id: uuidv4(),
        username: "Rachel",
        desc: "Hallo aku Rachel, dari Semarang"
    },
]

app.get("/comments", (req, res) => {
    res.render("comments/index", {comments})
})

app.get("/comments/create", (req, res) => {
    res.render("comments/create", {comments})
})

app.post("/comments", (req, res) => {
    const {username, desc} = req.body;
    comments.push({username, desc, id: uuidv4()})
    res.redirect("/comments")
})

app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/show", {comment});
})

app.get("/comments/:id/edit", (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", {comment});
})

app.patch("/comments/:id", (req, res) => {
    const {id} = req.params;
    const newComment = req.body.desc;
    const foundComment = comments.find(c => c.id === id);
    foundComment.desc = newComment;
    res.redirect("/comments");
})


app.get("/order", (req, res) => {
    res.send("GET order is response")
})

app.post("/order", (req, res) => {
    const { item, qty } = req.body;
    res.send(`Item: ${item} - Qty: ${qty}`)
})

app.listen(8080, () => {
console.log("Server is running on http://localhost:8080")
})