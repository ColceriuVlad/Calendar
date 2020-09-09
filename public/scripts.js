calendarcounter = -29
ecounter = -1
container = document.querySelector(".calendarcontainer")
subcontainer = document.querySelector(".subcontainer")



document.body.appendChild(container)
class createcalendar {
    constructor() {

        //the calendar
        this.calendar = document.createElement("div")
        this.calendar.setAttribute("class", 'calendar')
        subcontainer.appendChild(this.calendar)

        //eventside
        this.eventside = document.createElement("div")
        this.eventside.setAttribute("class", 'event-side')
        this.calendar.appendChild(this.eventside)

        //calendarside
        this.calendarside = document.createElement("div")
        this.calendarside.setAttribute("class", 'calendar-side')
        this.calendar.appendChild(this.calendarside)

        //year
        this.year = document.createElement("div")
        this.year.setAttribute("class", 'year')
        this.calendarside.appendChild(this.year)

        //month
        this.month = document.createElement("div")
        this.month.setAttribute("class", 'month')
        this.calendarside.appendChild(this.month)

        //weekdays
        this.weekdays = document.createElement("div")
        this.weekdays.setAttribute("class", 'weekdays')
        this.calendarside.appendChild(this.weekdays)

        //days
        this.days = document.createElement("days")
        this.days.setAttribute("class", 'days')
        this.calendarside.appendChild(this.days)

        //butons
        this.buttons = document.createElement("div")
        this.buttons.setAttribute("class", "buttons")
        this.calendarside.appendChild(this.buttons)

        //previous
        this.previous = document.createElement("button")
        this.previous.setAttribute("class", "previous")
        this.previous.innerHTML = "<"
        this.buttons.appendChild(this.previous)

        //next
        this.next = document.createElement("button")
        this.next.setAttribute("class", "next")
        this.next.innerHTML = ">"
        this.buttons.appendChild(this.next)



        //sendcontainer
        this.sendcontainer = document.createElement("div")
        this.sendcontainer.setAttribute("class", "sendcontainer")
        this.eventside.appendChild(this.sendcontainer)
        //input
        this.input = document.createElement("input")
        this.input.setAttribute("class", "input")
        this.sendcontainer.appendChild(this.input)

        //sendbutton
        this.send = document.createElement("button")
        this.send.setAttribute("class", "send")
        this.send.innerHTML = "+"
        this.sendcontainer.appendChild(this.send)

        //event header
        this.eventhead = document.createElement("h1")
        this.eventhead.setAttribute("class", "eventhead")
        this.eventhead.innerText = "Events List: "
        this.eventside.appendChild(this.eventhead)

        //eventparagraph
        this.eventp = document.createElement("div")
        this.eventp.setAttribute("class", "eventp")
        this.eventside.appendChild(this.eventp)



        this.setup()
    }

    setup() {

        // t comes from text
        let date = new Date()
        this.tdate = new Date(date.getFullYear(), date.getMonth() + calendarcounter, date.getDate())
        calendarcounter++
        ecounter++
        this.tyear = this.tdate.getFullYear()
        this.tmonth = this.tdate.getMonth()
        this.tday = this.tdate.getDate()
        this.prevdayindex = new Date(this.tyear, this.tmonth, 1).getDay()
        this.dayoflastmonth = new Date(this.tdate.getFullYear(), this.tmonth, 0).getDate()
        this.monthlastday = new Date(this.tyear, this.tmonth + 1, 0).getDate()
        this.lastdayindex = new Date(this.tyear, this.tmonth, this.monthlastday).getDay()



        this.lastdayindex = 7 - this.lastdayindex


        this.fillprev = this.dayoflastmonth - this.prevdayindex + 1


        this.days
        this.assignmonth = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        this.twday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

        this.year.innerHTML = "Year: " + this.tyear
        this.month.innerHTML = "Month: " + this.assignmonth[this.tmonth] + " " + date.getDate()
        for (let i = 0; i < this.twday.length; i++) {
            this.weekdays.innerHTML += `<p class="wday">${this.twday[i]}</p>`
        }
        this.filldays()
    }


    filldays() {
        for (let i = this.fillprev; i <= this.dayoflastmonth; i++) {
            this.days.innerHTML += `<p class="before">${i}</p>`
        }

        for (let i = 1; i <= this.monthlastday; i++) {
            this.days.innerHTML += `<p class="current" dyear="${this.tyear}" dmonth="${this.assignmonth[this.tmonth]}" ecounter="${ecounter}" dday="${i}">${i}</p>`

        }

        for (let i = 1; i < this.lastdayindex; i++) {
            this.days.innerHTML += `<p class="after">${i}</p>`
        }




    }




}
let calendar = []
let currentdays
let data
let eventp

function createthecalendars(selectcurentday, selecttheevents, selectaday) {
    for (let i = 0; i < 60; i++) {
        let date = new Date()
        calendar[i] = new createcalendar()
    }

    eventp = document.getElementsByClassName("eventp")
    selectcurentday()
    selecttheevents()
    selectaday()
}
createthecalendars(selectcurentday, selecttheevents, selectaday)


for (let i = 0; i < calendar.length; i++) {
    calendar[i].input.addEventListener("click", function () {
        for (let p = 0; p < calendar.length; p++) {
            calendar[p].input.value = ""
        }

    })




    calendar[i].send.addEventListener("click", function senddata() {
        if (calendar[i].input.value) {
            data.event = calendar[i].input.value
            calendar[i].input.value = ""

            async function sendit() {

                for (let n = 0; n < calendar.length - 1; n++) {
                    if (eventp[n].innerHTML != "") {
                        eventp[n].innerHTML = ""
                    }
                }
                newdata = data
                theid = newdata.id


                currentdays[theid].style.backgroundImage = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

                newdata = JSON.stringify(newdata)


                let response = await fetch("/api", {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: newdata
                })



                let response2 = await fetch("/back")
                let jason = await response2.json()



                for (let x = 0; x < jason.length; x++) {
                    if (jason[x].id == theid) {
                        eventp[ecounter].innerHTML += `<div class="container"><div> •  ${jason[x].event}</div><i class="fas fa-trash  c${jason[x].id}" id=${jason[x].id} event="${jason[x].event}"></i></div>`
                    }
                }

                let deleteicons = document.getElementsByTagName("i")
                for (let i = 0; i < deleteicons.length; i++) {
                    deleteicons[i].addEventListener("click", async function () {
                        let id = deleteicons[i].id
                        let event = deleteicons[i].getAttribute("event")

                        let deletedata = {
                            id,
                            event
                        }

                        deletedata = JSON.stringify(deletedata)






                        this.parentNode.style.display = "none"
                        this.parentNode.classList.add(`removedfromdb${id}`)


                        if (this.parentNode.parentNode.children.length == document.querySelectorAll(`.removedfromdb${id}`).length) {
                            document.querySelectorAll(".current")[id].style.backgroundImage = "none"
                        }


                        let deleteevent = await fetch("/delete", {
                            method: "post",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: deletedata
                        })

                    })
                }





            }
            sendit()
                .catch(error => {
                    console.error(error)
                })
        }
    })
}


calendars = document.getElementsByClassName("calendar")
prev = document.getElementsByClassName("previous")
next = document.getElementsByClassName("next")




function movethecalendar() {
    let x = -(calendar.length - 2) * 60 / 2
    speedx = 60
    subcontainer.style.marginTop = x + "vh"


    for (let i = 0; i < calendars.length; i++) {
        next[i].addEventListener("click", function () {
            for (let h = 0; h < currentdays.length; h++) {
                eventp[i].innerHTML = ""
                currentdays[h].classList.remove("activated")
            }

            for (let r = 0; r < calendar.length; r++) {
                calendar[r].month.innerText = "Month: " + calendar[r].assignmonth[calendar[r].tmonth]
            }

            if (x > -(calendars.length - 1) * speedx) {
                x = x - speedx
                subcontainer.style.marginTop = x + "vh"
            }

        })
    }

    for (let i = 0; i < calendars.length; i++) {
        prev[i].addEventListener("click", function () {
            eventp[i].innerHTML = ""
            for (let m = 0; m < currentdays.length; m++) {
                currentdays[m].classList.remove("activated")
            }


            if (x < 0) {
                x = x + speedx
                subcontainer.style.marginTop = x + "vh"
            }
        })
    }
}

movethecalendar()

function selectcurentday() {
    currentdays = document.getElementsByClassName("current")
    let newdate = new Date()
    nyear = parseInt(newdate.getFullYear())
    nmonth = calendar[0].assignmonth[newdate.getMonth()].toString()
    nday = parseInt(newdate.getDate())



    for (let i = 0; i < currentdays.length; i++) {
        dyear = parseInt(currentdays[i].getAttribute("dyear"))
        dmonth = currentdays[i].getAttribute("dmonth").toString()
        dday = parseInt(currentdays[i].getAttribute("dday"))



        if (nyear === dyear && nmonth === dmonth && nday === dday) {

            currentdays[i].classList.add("activated")
            data = {
                dyear,
                dmonth,
                dday,
                id: i
            }

            async function getevents() {
                theid = data.id
                ecounter = currentdays[i].getAttribute("ecounter")



                let response2 = await fetch("/back")
                let jason = await response2.json()


                for (let x = 0; x < jason.length; x++) {
                    if (jason[x].id == theid) {
                        eventp[ecounter].innerHTML += `<div class="container"><div> •  ${jason[x].event}</div><i class="fas fa-trash  c${jason[x].id}" id=${jason[x].id} event="${jason[x].event}"></i></div>`
                    }
                }

                let deleteicons = document.getElementsByTagName("i")
                for (let i = 0; i < deleteicons.length; i++) {
                    deleteicons[i].addEventListener("click", async function () {
                        let id = deleteicons[i].id
                        let event = deleteicons[i].getAttribute("event")

                        let deletedata = {
                            id,
                            event
                        }

                        deletedata = JSON.stringify(deletedata)





                        this.parentNode.style.display = "none"
                        this.parentNode.classList.add(`removedfromdb${id}`)


                        if (this.parentNode.parentNode.children.length == document.querySelectorAll(`.removedfromdb${id}`).length) {
                            document.querySelectorAll(".current")[id].style.backgroundImage = "none"
                        }


                        let deleteevent = await fetch("/delete", {
                            method: "post",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: deletedata
                        })

                    })
                }



            }
            getevents()


        }
    }




}

async function selecttheevents() {
    let response = await fetch("/back")
    let jdata = await response.json()

    for (let i = 0; i < jdata.length; i++) {
        let eID = jdata[i].id
        currentdays[eID].style.backgroundImage = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }


}





function selectaday() {
    for (let z = 0; z < currentdays.length; z++) {
        currentdays[z].addEventListener("click", function () {

            for (let k = 0; k < currentdays.length; k++) {
                currentdays[k].classList.remove("activated")
            }




            currentdays[z].classList.add("activated")
            let cday = currentdays[z]

            dyear = cday.getAttribute("dyear")
            dmonth = cday.getAttribute("dmonth")
            dday = cday.getAttribute("dday")

            for (let r = 0; r < calendar.length; r++) {
                calendar[r].month.innerText = "Month: " + calendar[r].assignmonth[calendar[r].tmonth] + " " + dday
            }


            for (let n = 0; n < calendar.length - 1; n++) {
                if (eventp[n].innerHTML != "") {
                    eventp[n].innerHTML = ""
                }
            }


            data = {
                dyear,
                dmonth,
                dday,
                id: z
            }

            async function getevents() {
                theid = data.id
                ecounter = currentdays[z].getAttribute("ecounter")


                let response2 = await fetch("/back")
                let jason = await response2.json()


                for (let x = 0; x < jason.length; x++) {
                    if (jason[x].id == theid) {
                        eventp[ecounter].innerHTML += `<div class="container"><div> •  ${jason[x].event}</div><i class="fas fa-trash  c${jason[x].id}" id=${jason[x].id} event="${jason[x].event}"></i></div>`
                    }
                }

                let deleteicons = document.getElementsByTagName("i")
                for (let i = 0; i < deleteicons.length; i++) {
                    deleteicons[i].addEventListener("click", async function () {
                        let id = deleteicons[i].id
                        let event = deleteicons[i].getAttribute("event")

                        let deletedata = {
                            id,
                            event
                        }

                        deletedata = JSON.stringify(deletedata)




                        this.parentNode.style.display = "none"
                        this.parentNode.classList.add(`removedfromdb${id}`)


                        if (this.parentNode.parentNode.children.length == document.querySelectorAll(`.removedfromdb${id}`).length) {
                            document.querySelectorAll(".current")[id].style.backgroundImage = "none"
                        }


                        let deleteevent = await fetch("/delete", {
                            method: "post",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: deletedata
                        })

                    })
                }


            }
            getevents()
        })
    }
}