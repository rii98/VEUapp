const express = require("express")
const ejs = require("ejs")
const { map } = require("lodash")



const app = express()
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")


const posts = []

const comments = new Map()


const post = { author: "rb_123", publishedTime: "12/2/2023 12:14 AM", body: "This is the pathetic behavior shown by honorable PM of Nepal.Shamefull act!!" }

app.get("/", (req, res) => {
    res.render("home", { posts: posts })
})



app.post("/", (req, res) => {
    const publishedTime = new Date().toLocaleString()
    const id = new Date().getTime();

    comments.set(id, [])
    if (req.body.postbody.length !== 0) {
        const post = { postbody: req.body.postbody, publishedTime: publishedTime, id: new Date().getTime(), comments: comments }
        posts.push(post)
    }
    res.redirect("/")
})

app.post("/comment", (req, res) => {


    const c = req.body.comment
    const id = req.body.id


    comments.get(Number(id)).push(c)
    console.log(id)
    console.log(comments.get(Number(id)))

    res.redirect("/")
})

app.get("/profile", (req, res) => {
    res.render("friend",{posts:posts})
})


app.listen(3000, () => {
    console.log(`Server is live on port 3000`)
})