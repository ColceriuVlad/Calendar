const express = require("express")
const app = express()
const port = process.env.PORT || 3005
require("dotenv").config()
app.listen(`${port}`, function () {
    console.log(`${port}`)
})
app.use(express.static('public'))
app.use(express.json())
const MongoClient = require("mongodb").MongoClient
const uri = process.env.uri_key
const clients = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let calendardb;

clients.connect(error => {
    if (error) {
        console.log(error)
    }
    calendardb = clients.db("calendardb")

})





//routing to send back the events to the calendar
app.get("/back", function (req, resp) {
    calendardb.collection("events").find({}).toArray(function (error, element) {
        if (error) {
            console.error(error)
        }
        resp.json(element)
    })
})

//routhing to recieve the events from the calendar
app.post("/api", function (request, response) {
    calendardb.collection("events").insertOne(request.body)
    response.end()
})


app.post("/delete", function (request, response) {
    deleter = (request.body)
    deleterid = deleter.id
    deleterevent = deleter.event
    calendardb.collection("events").deleteOne({
        $and: [{
                id: parseInt(deleterid)
            },
            {
                event: deleterevent
            }
        ]
    })

    response.end()
})