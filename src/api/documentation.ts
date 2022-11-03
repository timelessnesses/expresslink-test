/**
 * @openapi
 * /api/test:
 *   get:
 *     summary: Test and get information about lavalink server
 *     tags:
 *       - Test
 *     parameters:
 *        - in: query
 *          name: host
 *          schema:
 *            type: string
 *          description: Lavalink host (don't include http/https/ws/wss/:{port})
 *          required: true
 *        - in: query
 *          name: port
 *          schema:
 *            type: number
 *          description: Lavalink port
 *          required: true
 *        - in: query
 *          name: ssl
 *          schema:
 *            type: boolean
 *          description: Connect lavalink in ssl mode or not
 *        - in: query
 *          name: password
 *          schema:
 *            type: string
 *          description: Lavalink password
 *     responses:
 *       200:
 *         description: Returns information about the lavalink server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alive:
 *                   type: boolean
 *                   description: Whether the server is alive or not
 *                 ping:
 *                   type: number
 *                   description: The ping of the server
 *                 uptime:
 *                   type: number
 *                   description: The uptime of the server in milliseconds
 *                 error:
 *                   type: string
 *                   description: The error message if there is one
 *                 stuff:
 *                   type: string
 *                   description: The query into a string
 *                 stats:
 *                   type: object
 *                   description: The stats of the server
 */

// funny how i wrote this documentation inside typescript lmfao