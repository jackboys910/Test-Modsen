const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const { default: open } = require('open')
const db = require('../config/database')

async function generateFeedbackPdf(limit = 100) {
  try {
    const feedbacks = await db.query(
      `SELECT f.rating, f.description, f.submitted_at, u.email 
             FROM feedback f
             JOIN users u ON f.user_id = u.id
             ORDER BY f.submitted_at DESC
             LIMIT $1`,
      [limit]
    )

    if (feedbacks.rows.length === 0) {
      console.log('Нет отзывов для генерации PDF.')
      return
    }

    const doc = new PDFDocument()
    const pdfFolder = path.join(__dirname, 'pdf')

    if (!fs.existsSync(pdfFolder)) {
      fs.mkdirSync(pdfFolder)
    }

    const pdfPath = path.join(pdfFolder, 'feedbacks.pdf')
    const writeStream = fs.createWriteStream(pdfPath)

    doc.pipe(writeStream)

    const fontPath = path.join(
      __dirname,
      '../../frontend/src/assets/fonts/Roboto/Regular/Roboto-Regular.ttf'
    )
    doc.font(fontPath).fontSize(20).text('Отзывы пользователей', {
      align: 'center',
    })

    doc.moveDown()

    feedbacks.rows.forEach((feedback, index) => {
      doc.fontSize(12).text(`Отзыв #${index + 1}:`, { bold: true })
      doc.fontSize(12).text(`Пользователь: ${feedback.email}`)
      doc
        .fontSize(12)
        .text(
          `Дата отправки: ${new Date(feedback.submitted_at).toLocaleString()}`
        )
      doc.fontSize(12).text(`Рейтинг: ${feedback.rating || 'Не указан'}`)
      doc.fontSize(12).text(`Описание: ${feedback.description}`)
      doc.moveDown()

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()

      doc.moveDown()
    })

    doc.end()

    writeStream.on('finish', () => {
      console.log(`PDF-файл успешно создан: ${pdfPath}`)
      open(pdfPath, { app: { name: 'chrome' } })
    })
  } catch (error) {
    console.error('Ошибка при создании PDF:', error)
  }
}

const limit = process.argv[2] ? parseInt(process.argv[2], 10) : 100
generateFeedbackPdf(limit)
