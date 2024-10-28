const express = require('express')
const http = require('http')
const { Server: SocketServer } = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const db = require('./config/database')
const AuthMiddleware = require('./middlewares/auth')
const UploadMiddleware = require('./middlewares/upload')
const UserController = require('./controllers/userController')
const MessageController = require('./controllers/messageController')

class Server {
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server, {
      cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
      },
    })
    this.port = 3001
    this.middlewares()
    this.routes()
    this.socketEvents()
    this.start()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(
      '/assets/images',
      express.static(path.join(__dirname, 'uploads'))
    )
  }

  routes() {
    this.app.post('/register', UserController.register)
    this.app.post('/login', UserController.login)
    this.app.post(
      '/updateProfile',
      AuthMiddleware.authenticateJWT,
      UploadMiddleware.upload.single('profilePicture'),
      UserController.updateProfile
    )
    this.app.post(
      '/updateLastOnline',
      AuthMiddleware.authenticateJWT,
      UserController.updateLastOnline
    )
    this.app.get(
      '/getProfile',
      AuthMiddleware.authenticateJWT,
      UserController.getProfile
    )
    this.app.post(
      '/markAsTried/:recipeUri',
      AuthMiddleware.authenticateJWT,
      UserController.markAsTried
    )
    this.app.get(
      '/usersWhoTriedRecipe/:recipeUri',
      UserController.getUsersWhoTriedRecipe
    )
    this.app.get(
      '/hasUserTriedRecipe/:recipeUri',
      AuthMiddleware.authenticateJWT,
      UserController.hasUserTriedRecipe
    )
    this.app.get(
      '/getProfileByNickname/:nickname',
      UserController.getProfileByNickname
    )
    this.app.post(
      '/rateRecipe/:recipeUri',
      AuthMiddleware.authenticateJWT,
      UserController.rateRecipe
    )
    this.app.get(
      '/getUserRating/:recipeUri',
      AuthMiddleware.authenticateJWT,
      UserController.getUserRating
    )
    this.app.get(
      '/recipeRatingInfo/:recipeUri',
      UserController.getRecipeRatingInfo
    )
    this.app.get(
      '/messages/:receiverId',
      AuthMiddleware.authenticateJWT,
      MessageController.getMessages
    )
    this.app.post(
      '/sendMessage',
      AuthMiddleware.authenticateJWT,
      MessageController.sendMessage
    )
    this.app.get(
      '/users/nickname/:nickname',
      MessageController.getUserIdByNickname
    )
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      socket.on('joinRoom', (userId) => {
        socket.join(userId.toString())
      })

      socket.on(
        'sendMessage',
        async ({ senderId, receiverNickname, content }) => {
          try {
            const receiverResult = await db.query(
              `SELECT user_ref FROM user_profiles WHERE nickname = $1`,
              [receiverNickname]
            )

            if (receiverResult.rows.length === 0) {
              console.error('Receiver not found')
              return
            }

            const receiverId = receiverResult.rows[0].user_ref

            // await MessageController.saveMessage(senderId, receiverId, content)
            await db.query(
              `INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)`,
              [senderId, receiverId, content]
            )
            if (receiverId && senderId) {
              this.io.to(receiverId.toString()).emit('receiveMessage', {
                senderId,
                content,
              })
              this.io.to(senderId.toString()).emit('receiveMessage', {
                senderId,
                content,
              })
            } else {
              console.error('Invalid senderId or receiverId')
            }
          } catch (error) {
            console.error('Error sending message:', error)
          }
        }
      )

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
      })
    })
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

new Server()
