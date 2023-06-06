const multer = require('multer');
const maxFileSize = 1000000; //(B) bytes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const imageUpload = multer({ storage, limits: { fileSize: maxFileSize } });

const imageUploadMiddleware = (req, res, next) => {
  imageUpload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    next();
  });
};

module.exports = imageUploadMiddleware;
