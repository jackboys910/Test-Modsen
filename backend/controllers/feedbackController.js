const db = require('../config/database')

class FeedbackController {
  async submitFeedback(req, res) {
    const userId = req.user.userId
    const { rating, description } = req.body

    if (description.length < 5 || description.length > 300) {
      return res.status(400).json({
        message: 'Description must be between 5 and 300 characters.',
      })
    }

    try {
      await db.query(
        `INSERT INTO feedback (user_id, rating, description) VALUES ($1, $2, $3) RETURNING *`,
        [userId, rating || null, description]
      )
      res.status(201).json({ message: 'Feedback submitted successfully!' })
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = new FeedbackController()
