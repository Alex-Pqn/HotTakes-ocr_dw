const multer = require('multer');

//allowed files types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  //defined destination folder
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //defined filename
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name + Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage }).single('image');
