import { Router } from 'express'
import WebSocket from 'ws'
import { z } from 'zod'
const router = Router()

router.get('/test', function (req, res){
	const schema = z.object({
		host: z.string(),
		port: z.number().or(z.string()),
		ssl: z.boolean().default(false).or(z.string()),
		password: z.string().optional()
	})
	console.log(req.query)
	const query = schema.safeParse(req.query)
	if (!query.success) {
		res.status(400).send({
			alive: false,
			ping: 0,
			error: "Missing Queries",
			stuff: req.query,
			stats: {}
		})
		return
	}

	const port = parseInt(req.query.port!.toString())
	let ssl
	if (req.query.ssl === "true") {
		ssl = true
	}else{
		ssl = false
	}
	
	let password

	if(req.query.password){
		password = req.query.password!.toString()
	}else{
		password = ""
	}

	try{
		console.log('test if it exists')
		const b = new WebSocket(`${ssl ? 'wss' : 'ws'}://${req.query.host}:${port}`, {
			headers: {
				"Authorization": password,
				"User-Id": 69,
				"Client-Name": "Express.js websocket testing"
			}
		})
		console.log('created')
		b.on('message', function(){b.close();console.log("just closed it")})
	}catch(e){
		console.log("looks like it is problematic")
		console.log(e)
		res.status(400).send({
			alive: false,
			ping: 0,
			error: e,
			stuff: req.query,
			stats: {}
		})
		return
	}

	const ws = new WebSocket(`${req.query.ssl ? 'wss' : 'ws'}://${req.query.host}:${req.query.port}`, {
		headers: {
			"Authorization": req.query.password!.toString(),
			"User-Id": 69,
			"Client-Name": "Express.js websocket testing"
		}
	})
	
	ws.on('message', function(message){
		try{
			const data = JSON.parse(message.toString())
			const schema_stats = z.object({
				players: z.number(),
				playingPlayers: z.number(),
				uptime: z.number(),
				memory: z.object({
					free: z.number(),
					used: z.number(),
					allocated: z.number(),
					reservable: z.number(),
				}),
				cpu: z.object({
					cores: z.number(),
					systemLoad: z.number(),
					lavalinkLoad: z.number()
				}),
				frames: z.any(), // i dont care about this one
				op: z.any()
			})
			console.log(data)
			const stats = schema_stats.safeParse(data)
			if (!stats.success) {
				res.status(400).send({
					alive: false,
					ping: 0,
					error: "Object recieved from websocket isn't valid\n" + stats.error,
					stuff: req.query,
					stats: {}
				})
				ws.close()
				return
			}
			const current_time = Date.now()
			ws.ping()
			const time = (Date.now() - current_time)
			res.send({
				alive: true,
				ping: time,
				error: null,
				stuff: query,
				stats: data,

			})
		}catch(e){
			res.send({
				alive: false,
				ping: 0,
				error: "Something has gone terribly wrong",
				stuff: req.query,
				stats: {}
			})
		}
		ws.close()
	})
})

export default router