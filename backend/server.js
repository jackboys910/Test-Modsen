const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const AuthMiddleware = require('./middlewares/auth')
const UploadMiddleware = require('./middlewares/upload')
const UserController = require('./controllers/userController')

class Server {
  constructor() {
    this.app = express()
    this.port = 3001
    this.middlewares()
    this.routes()
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
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

new Server()
