const admin = require('firebase-admin')
require('dotenv').config()

const serviceAccount = require('../recipesearchimages-firebase-adminsdk-waphq-ea27a61edd.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

const bucket = admin.storage().bucket()

async function uploadImage(fileBuffer, fileName) {
  const file = bucket.file(fileName)
  await file.save(fileBuffer, {
    metadata: { contentType: 'image/jpeg' },
    public: true,
  })
  return file.publicUrl()
}

module.exports = { uploadImage }
