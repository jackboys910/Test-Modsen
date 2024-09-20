const fs = require('fs')
const db = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const path = require('path')
const { storageDir } = require('../middlewares/upload')

class UserController {
  async register(req, res) {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const existingUser = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      )

      if (existingUser.rows.length > 0) {
        return res.status(409).send('Email already registered')
      }

      const userResult = await db.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
      )

      const userId = userResult.rows[0].id

      await db.query('INSERT INTO user_profiles (user_ref) VALUES ($1)', [
        userId,
      ])

      res.status(201).send('User registered')
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        email,
      ])
      const user = result.rows[0]

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret')

        await db.query(
          'UPDATE user_profiles SET last_online = CURRENT_TIMESTAMP WHERE user_ref = $1',
          [user.id]
        )

        res.json({ token })
      } else {
        res.status(401).send('Invalid credentials')
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async updateProfile(req, res) {
    const userId = req.user.userId
    const { description, phoneNumber, location, nickname, cuisine } = req.body

    let profilePicture = null
    if (req.file) {
      profilePicture = `${Date.now()}-${req.file.originalname}`
      const filePath = path.join(storageDir, profilePicture)

      try {
        await sharp(req.file.buffer).resize(250, 250).toFile(filePath)

        const result = await db.query(
          'SELECT profile_picture FROM user_profiles WHERE user_ref = $1',
          [userId]
        )
        const oldPicture = result.rows[0].profile_picture
        if (oldPicture && oldPicture !== 'defaultUser.png') {
          fs.unlinkSync(path.join(storageDir, oldPicture))
        }
      } catch (err) {
        return res.status(500).send('Error processing image')
      }
    }

    try {
      const result = await db.query(
        `
        UPDATE user_profiles SET
          profile_picture = COALESCE($1, profile_picture),
          description = $2,
          phone_number = $3,
          location = $4,
          nickname = $5,
          cuisine = $6,
          last_online = CURRENT_TIMESTAMP
        WHERE user_ref = $7
        RETURNING *`,
        [
          profilePicture,
          description,
          phoneNumber,
          location,
          nickname,
          cuisine,
          userId,
        ]
      )

      res.json(result.rows[0])
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async updateLastOnline(req, res) {
    const userId = req.user.userId
    try {
      await db.query(
        'UPDATE user_profiles SET last_online = CURRENT_TIMESTAMP WHERE user_ref = $1',
        [userId]
      )
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async getProfile(req, res) {
    const userId = req.user.userId
    try {
      const result = await db.query(
        'SELECT profile_picture, description, phone_number, location, nickname, cuisine, registered_at, last_online FROM user_profiles WHERE user_ref = $1',
        [userId]
      )
      if (result.rows.length > 0) {
        res.json(result.rows[0])
      } else {
        res.status(404).send('Profile not found')
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = new UserController()
