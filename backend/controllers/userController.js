const fs = require('fs')
const db = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const path = require('path')
const { storageDir } = require('../middlewares/upload')

class UserController {
  async register(req, res) {
    const { email, password, nickname } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const existingUser = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      )

      if (existingUser.rows.length > 0) {
        return res.status(409).send('Email already registered')
      }

      const existingNickname = await db.query(
        'SELECT * FROM user_profiles WHERE nickname = $1',
        [nickname]
      )

      if (existingNickname.rows.length > 0) {
        return res.status(409).send('Nickname already taken')
      }

      const userResult = await db.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
      )

      const userId = userResult.rows[0].id

      await db.query(
        'INSERT INTO user_profiles (user_ref, nickname) VALUES ($1, $2)',
        [userId, nickname]
      )

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

        const profileResult = await db.query(
          'SELECT nickname FROM user_profiles WHERE user_ref = $1',
          [user.id]
        )
        const nickname = profileResult.rows[0].nickname

        await db.query(
          'UPDATE user_profiles SET last_online = CURRENT_TIMESTAMP WHERE user_ref = $1',
          [user.id]
        )

        res.json({ token, nickname, userId: user.id })
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

  async getProfileByNickname(req, res) {
    const { nickname } = req.params
    try {
      const result = await db.query(
        `SELECT profile_picture, description, phone_number, location, nickname, cuisine, registered_at, last_online FROM user_profiles WHERE nickname = $1`,
        [nickname]
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

  async markAsTried(req, res) {
    const userId = req.user.userId
    const { recipeUri } = req.params

    try {
      const recipeResult = await db.query(
        `SELECT id FROM recipes WHERE uri = $1`,
        [recipeUri]
      )

      let recipeId
      if (recipeResult.rows.length === 0) {
        const insertRecipe = await db.query(
          `INSERT INTO recipes (uri) VALUES ($1) RETURNING id`,
          [recipeUri]
        )
        recipeId = insertRecipe.rows[0].id
      } else {
        recipeId = recipeResult.rows[0].id
      }

      const existingEntry = await db.query(
        `SELECT * FROM user_tried_recipes WHERE user_id = $1 AND recipe_id = $2`,
        [userId, recipeId]
      )

      if (existingEntry.rows.length > 0) {
        return res.status(400).json({ message: 'Already marked as tried' })
      }

      await db.query(
        `INSERT INTO user_tried_recipes (user_id, recipe_id) VALUES ($1, $2)`,
        [userId, recipeId]
      )

      res.status(200).json({ message: 'Marked as tried' })
    } catch (error) {
      console.error('Error marking as tried:', error)
      res.status(500).json({ message: error.message })
    }
  }

  async getUsersWhoTriedRecipe(req, res) {
    const { recipeUri } = req.params

    try {
      const result = await db.query(
        `SELECT up.nickname, up.profile_picture FROM user_tried_recipes utr
         JOIN recipes r ON utr.recipe_id = r.id
         JOIN user_profiles up ON up.user_ref = utr.user_id
         WHERE r.uri = $1
         ORDER BY utr.tried_at DESC
         LIMIT 3`,
        [recipeUri]
      )

      res.json(result.rows)
    } catch (error) {
      console.error('Error fetching users:', error)
      res.status(400).json({ message: error.message })
    }
  }

  async hasUserTriedRecipe(req, res) {
    const userId = req.user.userId
    const { recipeUri } = req.params

    try {
      const result = await db.query(
        `SELECT * FROM user_tried_recipes utr
         JOIN recipes r ON utr.recipe_id = r.id
         WHERE utr.user_id = $1 AND r.uri = $2`,
        [userId, recipeUri]
      )

      res.json({ hasTried: result.rows.length > 0 })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async rateRecipe(req, res) {
    const userId = req.user.userId
    const { recipeUri } = req.params
    const { rating } = req.body

    if (rating < 1 || rating > 5) {
      return res.status(400).send('Rating must be between 1 and 5')
    }

    try {
      await db.query(
        `INSERT INTO user_recipe_ratings (user_id, recipe_uri, rating)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, recipe_uri)
         DO UPDATE SET rating = EXCLUDED.rating`,
        [userId, recipeUri, rating]
      )

      res.status(200).send('Rating submitted')
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  async getUserRating(req, res) {
    const userId = req.user.userId
    const { recipeUri } = req.params

    try {
      const result = await db.query(
        `SELECT rating FROM user_recipe_ratings
         WHERE user_id = $1 AND recipe_uri = $2`,
        [userId, recipeUri]
      )

      if (result.rows.length > 0) {
        res.json({ rating: result.rows[0].rating })
      } else {
        res.json({ rating: null })
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  async getRecipeRatingInfo(req, res) {
    const { recipeUri } = req.params

    try {
      const result = await db.query(
        `SELECT AVG(rating) AS average_rating, COUNT(rating) AS rating_count 
         FROM user_recipe_ratings 
         WHERE recipe_uri = $1`,
        [recipeUri]
      )

      if (result.rows.length > 0) {
        res.json({
          averageRating: parseFloat(result.rows[0].average_rating).toFixed(2),
          ratingCount: result.rows[0].rating_count,
        })
      } else {
        res.json({ averageRating: null, ratingCount: 0 })
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}

module.exports = new UserController()
