const express = require("express")
const db = require("../data/config")

const router = express.Router()


router.get("/", async (req, res, next) => {
	try {
		res.json(await db("cars"))
	} catch(err) {
		next(err)
	}
})

router.get("/:id", validateCarId(), async (req, res, next) => {
	try {
		res.json(req.car)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const [id] = await db("users").insert(req.body)
		const car = await db("cars").where({ id }).first()

		res.status(201).json(car)
	} catch(err) {
		next(err)
	}
})

router.put("/:id", validateCarId(), async (req, res, next) => {
	try {
		const { id } = req.params
		await db("cars").where({ id }).update(req.body)
		const car = await db("cars").where({ id }).first()
		
		res.json(car)
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", validateCarId(), async (req, res, next) => {
	try {
		const { id } = req.params
		await db("cars").where({ id }).del()

		res.status(204).end()
	} catch(err) {
		next(err)
	}
})

function validateCarId() {
	return async (req, res, next) => {
		try {
			const { id } = req.params
			const car = await db("cars").where({ id }).first()

			if (!car) {
				return res.status(404).json({
					message: "User not found",
				})
			}

			req.car = car
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = router