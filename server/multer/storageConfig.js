const multer = require('multer')

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    const filename = `img_${Date.now()}_${file.originalname}`
    cb(null, filename)
  }
})


// filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg & .jpeg formats allowed '))
  }
}


const upload = multer({ storage, fileFilter })


module.exports = upload  