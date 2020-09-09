# Calendar with Events

You can check the finished version here:

Heroku: https://calendar-with-events.herokuapp.com/

If you wana deploy your own version of the app to the cloud using Heroku, simply set a value for the uri_key environment variable as following:

Go to MongoDB Atlas, create a user, create a free cluster and add a user to that cluster

heroku config:set uri_key="mongodb+srv://[user]:[password]@cluster0.l3ylu.gcp.mongodb.net/calendardb?retryWrites=true&w=majority"

Replace [user] with your cluster user and [password] with your cluster password

If you wana run it locally, you have to create a .env file that contains the same environment variable and set it like this:

uri_key = "mongodb://localhost:27017"

