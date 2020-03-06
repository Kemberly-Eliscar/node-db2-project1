const express = require("express")
// const helmet = require("helmet")
const carRouter = require("./router/carRouter")

const server = express()
const port = process.env.PORT || 4040

//server.use(helmet())
server.use(express.json())

server.use("/", carRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})