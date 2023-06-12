require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const morgan = require("morgan")
const http = require("http")
const { Server } = require("socket.io")

const { router } = require("./routes");
const { authRouter } = require('./routes/auth.route')
const { errorHandler } = require('./middlewares/error.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware')

const app = express();
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })
global.io = io

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL).then(
	() => {
		console.log('DB connected!')
	},
	(err) => {
		console.log("Error", err)
	}
)

app.use(cors())
app.use(express.json())
app.use(morgan("common"))
app.use("/auth", authRouter)
app.use(authMiddleware)
app.use("/", router)
app.use(errorHandler)

io.on('connection', (socket) => {
	console.log('a user connected', socket.id);
	io.emit('myMessage', {})
});

module.exports = server.listen(port, () => {
	console.log(global)
	console.log(`Social media app listening on port ${port}`)
	io.emit('myEvent', {})
})
