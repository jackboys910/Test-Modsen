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
        `SELECT u.id, up.nickname, up.profile_picture, up.last_online,
                MAX(m.sent_at) AS last_message_time
         FROM messages m
         JOIN users u ON (u.id = m.sender_id OR u.id = m.receiver_id) AND u.id != $1
         JOIN user_profiles up ON up.user_ref = u.id
         WHERE (m.sender_id = $1 OR m.receiver_id = $1) AND m.sender_id != m.receiver_id
         GROUP BY u.id, up.nickname, up.profile_picture, up.last_online
         UNION
         SELECT $1 AS id, 'Saved Messages' AS nickname, 'scale_1200-round.png' AS profile_picture, 
                NULL AS last_online, MAX(m.sent_at) AS last_message_time
         FROM messages m
         WHERE m.sender_id = $1 AND m.receiver_id = $1
         GROUP BY m.sender_id, m.receiver_id
         ORDER BY last_message_time DESC`,
        [userId]
      )
      res.json(result.rows)
    } catch (error) {
      console.error('Error fetching conversations:', error)
      res.status(500).send(error.message)
    }
  }

  async search(req, res) {
    const userId = req.user.userId
    const { query } = req.query

    try {
      const usersResult = await db.query(
        `SELECT u.id, 
                CASE 
                  WHEN u.id = $2 THEN 'Saved Messages' 
                  ELSE up.nickname 
                END AS nickname, 
                CASE 
                  WHEN u.id = $2 THEN 'scale_1200-round.png' 
                  ELSE up.profile_picture 
                END AS profile_picture, 
                up.last_online,
                MAX(m.sent_at) AS last_message_time
         FROM users u
         LEFT JOIN user_profiles up ON up.user_ref = u.id
         LEFT JOIN messages m ON (m.sender_id = u.id OR m.receiver_id = u.id)
         AND (m.sender_id = $2 OR m.receiver_id = $2)
         WHERE (up.nickname ILIKE $1 OR (u.id = $2 AND 'Saved Messages' ILIKE $1))
         AND u.id != $2
         GROUP BY u.id, up.nickname, up.profile_picture, up.last_online`,
        [`${query}%`, userId]
      )

      let messagesResult
      const words = query.trim().split(/\s+/)

      if (words.length === 1) {
        const searchTerm = `${query}:*`
        messagesResult = await db.query(
          `SELECT DISTINCT u.id, 
                  CASE 
                    WHEN u.id = $1 THEN 'Saved Messages' 
                    ELSE up.nickname 
                  END AS nickname, 
                  CASE 
                    WHEN u.id = $1 THEN 'scale_1200-round.png' 
                    ELSE up.profile_picture 
                  END AS profile_picture, 
                  up.last_online,
                  MAX(m.sent_at) AS last_message_time
           FROM messages m
           JOIN users u ON u.id = m.sender_id OR u.id = m.receiver_id
           JOIN user_profiles up ON up.user_ref = u.id
           WHERE ((m.sender_id = $1 OR m.receiver_id = $1) OR (m.sender_id = $1 AND m.receiver_id = $1))
           AND (to_tsvector(m.content) @@ to_tsquery($2) OR up.nickname ILIKE $3 OR (u.id = $1 AND 'Saved Messages' ILIKE $3))
           AND (u.id != $1 OR (m.sender_id = $1 AND m.receiver_id = $1))
           GROUP BY u.id, up.nickname, up.profile_picture, up.last_online`,
          [userId, searchTerm, `${query}%`]
        )
      } else {
        messagesResult = await db.query(
          `SELECT DISTINCT u.id, 
                  CASE 
                    WHEN u.id = $1 THEN 'Saved Messages' 
                    ELSE up.nickname 
                  END AS nickname, 
                  CASE 
                    WHEN u.id = $1 THEN 'scale_1200-round.png' 
                    ELSE up.profile_picture 
                  END AS profile_picture, 
                  up.last_online,
                  MAX(m.sent_at) AS last_message_time
           FROM messages m
           JOIN users u ON u.id = m.sender_id OR u.id = m.receiver_id
           JOIN user_profiles up ON up.user_ref = u.id
           WHERE ((m.sender_id = $1 OR m.receiver_id = $1) OR (m.sender_id = $1 AND m.receiver_id = $1))
           AND (m.content ILIKE $2 OR up.nickname ILIKE $3 OR (u.id = $1 AND 'Saved Messages' ILIKE $3))
           AND (u.id != $1 OR (m.sender_id = $1 AND m.receiver_id = $1))
           GROUP BY u.id, up.nickname, up.profile_picture, up.last_online`,
          [userId, `%${query}%`, `${query}%`]
        )
      }

      const combinedResults = [...usersResult.rows, ...messagesResult.rows]
      const uniqueResults = [
        ...new Map(combinedResults.map((item) => [item.id, item])).values(),
      ]

      res.json(uniqueResults)
    } catch (error) {
      res.status(500).json({ error: error.message })
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
