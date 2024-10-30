const db = require('../config/database')

class MessageController {
  async getMessages(req, res) {
    const userId = req.user.userId
    const { receiverId } = req.params

    try {
      const result = await db.query(
        `SELECT sender_id, content, sent_at FROM messages
         WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
         ORDER BY sent_at`,
        [userId, receiverId]
      )

      res.json(result.rows)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  async sendMessage(req, res) {
    const { receiverNickname, content } = req.body
    const userId = req.user.userId

    try {
      const receiverResult = await db.query(
        `SELECT user_ref FROM user_profiles WHERE nickname = $1`,
        [receiverNickname]
      )

      if (receiverResult.rows.length === 0) {
        return res.status(404).send('Receiver not found')
      }

      const receiverId = receiverResult.rows[0].user_ref

      // await db.query(
      //   `INSERT INTO messages (sender_id, receiver_id, content)
      //    VALUES ($1, $2, $3)`,
      //   [userId, receiverId, content]
      // )

      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  async getUserIdByNickname(req, res) {
    const { nickname } = req.params
    try {
      const result = await db.query(
        `SELECT user_ref FROM user_profiles WHERE nickname = $1`,
        [nickname]
      )
      if (result.rows.length > 0) {
        res.json({ userId: result.rows[0].user_ref })
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Database error' })
    }
  }

  async getConversations(req, res) {
    const userId = req.user.userId

    try {
      const result = await db.query(
        `SELECT DISTINCT ON (u.id) u.id, up.nickname, up.profile_picture
         FROM messages m
         JOIN users u ON (u.id = m.sender_id OR u.id = m.receiver_id) AND u.id != $1
         JOIN user_profiles up ON up.user_ref = u.id
         WHERE m.sender_id = $1 OR m.receiver_id = $1
         ORDER BY u.id`,
        [userId]
      )
      res.json(result.rows)
    } catch (error) {
      console.error('Error fetching conversations:', error)
      res.status(500).send(error.message)
    }
  }

  // async saveMessage(senderId, receiverId, content) {
  //   return db.query(
  //     `INSERT INTO messages (sender_id, receiver_id, content)
  //      VALUES ($1, $2, $3)`,
  //     [senderId, receiverId, content]
  //   )
  // }
}

module.exports = new MessageController()
