const multer = require('multer')
const path = require('path')

const storageDir = path.join(__dirname, '../uploads')

class UploadMiddleware {
  constructor() {
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        )
        if (mimetype && extname) {
          return cb(null, true)
        }
        cb(
          new Error(
            'File upload only supports the following filetypes - ' + filetypes
          )
        )
      },
    })
  }
}

module.exports = { upload: new UploadMiddleware().upload, storageDir }
