const jwt = require('jsonwebtoken')

class AuthMiddleware {
  authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
          return res.sendStatus(403)
        }
        req.user = user
        next()
      })
    } else {
      res.sendStatus(401)
    }
  }
}

module.exports = new AuthMiddleware()
