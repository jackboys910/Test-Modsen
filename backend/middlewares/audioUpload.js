const multer = require('multer')
const path = require('path')

class AudioUploadMiddleware {
  constructor() {
    this.audioStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/audio'))
      },
      filename: (req, file, cb) => {
        const extension = path.extname(file.originalname) || '.webm'
        const uniqueSuffix = `${Date.now()}-${path.basename(
          file.originalname,
          path.extname(file.originalname)
        )}${extension}`
        cb(null, uniqueSuffix)
      },
    })

    this.upload = multer({
      storage: this.audioStorage,
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'audio/webm',
          'audio/mp3',
          'audio/wav',
          'audio/ogg',
        ]

        if (allowedMimeTypes.includes(file.mimetype)) {
          return cb(null, true)
        }

        cb(
          new Error(
            'Audio upload only supports the following filetypes - ' +
              allowedMimeTypes.join(', ')
          )
        )
      },
    })
  }
}

module.exports = new AudioUploadMiddleware().upload
