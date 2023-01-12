const express = require("express")
const bodyParser = require("body-parser")
const app = express()
let workItems = [];
var items = ["Workout", "Breakfast", "Office"];
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", { listTitle: day, newListItems: items });
});
app.post("/", function(req, res) {
    console.log(req.body)
    let item = req.body.newItem
    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)

        res.redirect("/")
    }
})
app.post("/work", function(req, res) {
    let item = res.body.newItem
    workItems.push(item)
    res.redirect("/work")
})
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})
app.listen(process.env.PORT||3000, function() {
    console.log("Server started on port 3000 ")
})
