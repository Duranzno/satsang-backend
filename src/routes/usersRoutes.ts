import { Request, Response, Router } from "express"

const router: Router = Router()

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *        - User
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get("/", (_req, _res) => {
  // Your implementation logic comes here ...
})

/**
 * @swagger
 *
 * /api/users:
 *   post:
 *     tags:
 *        - User
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post("/", (_req, _res) => {
  // Your implementation logic comes here ...
})
/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      tags:
 *        - User
 *      description: Gets existing User
 *      produces:
 *      -  application/json
 *      responses:
 *        200:
 *          description: user
 *          schema:
 *            $ref:'#definitions/User'
 */
router.get("/:id", (_req: Request, res: Response) => {
  res.send({})
})
/**
 * @swagger
 * /api/users/{id}:
 *    patch:
 *      tags:
 *        - User
 *      description: Complete Replacement of existing Post
 */
router.patch("/:id", (_req: Request, res: Response) => {
  res.send([])
})

/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *      tags:
 *        - User
 *      description: Deletes existing Post
 */
router.delete("/:id", (_req: Request, res: Response) => {
  res.send([])
})
const UserRoutes: Router = router
export default UserRoutes
